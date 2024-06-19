const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt =require('bcrypt')
const app = express();
const jwt=require('jsonwebtoken')
const port = 3000;
const cors = require('cors');
// Parse JSON bodies
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200' 
}));

// PostgreSQL configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'PwChappy',
    password: 'postgresql',
    port: 5432, // default PostgreSQL port
});

// Test PostgreSQL connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.stack);
    } else {
        console.log('Connected to PostgreSQL at:', res.rows[0].now);
    }
});
app.get("/api/users", (req, res) => {
    console.log("Bonjour");
    pool.query('SELECT * FROM users', (err, res) => {
        if (err) {
            console.error('Error connecting to PostgreSQL:', err.stack);
        } else {
            console.log('users found', res.rows);
        }
    });
});

// Exemple de route pour créer un utilisateur
app.post("/api/users", async (req, res) => {
    const { name, lastname,username, email, password, sex, role } = req.body;

    try {
        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Connect to the database
        const client = await pool.connect();
        
        // SQL query to insert user data
        const queryText = 'INSERT INTO users (name, lastname,username, email, password, sex, role) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *';
        
        // Prepare the values for the query
        const values = [name, lastname,username, email, hashedPassword, sex, role];

        // Log the values being inserted (optional)
        console.log('Values for insert:', values);

        // Execute the query
        const result = await client.query(queryText, values);

        // Get the newly created user from the result
        const newUser = result.rows[0];

        // Release the database connection
        client.release();

        // Send the response with the newly created user
        res.status(201).json(newUser);

    } catch (err) {
        // Catch any errors that occur during the process
        console.error('Error adding user to PostgreSQL:', err);
        res.status(500).json({ error: 'Failed to add user' });
    }
});
// BL login
app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;

    let client;

    try {
        // Obtenir une connexion depuis le pool
        client = await pool.connect();

        // Rechercher l'utilisateur dans la base de données par email
        const queryText = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await client.query(queryText, [email]);
        const user = rows[0];

        // Vérifier si l'utilisateur existe
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, 'sami@1989', { expiresIn: '1h' });

        // Utilisateur authentifié avec succès, retourner le token JWT
        res.status(200).json({ token });

    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        res.status(500).json({ message: 'Échec de la connexion' });
    } finally {
        // Libérer la connexion dans tous les cas
        if (client) {
            client.release();
        }
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

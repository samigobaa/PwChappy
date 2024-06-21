const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');  // Ajout de bcrypt
const cors = require('cors');  // Ajout de CORS
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Middleware pour parser les corps de requête JSON
app.use(bodyParser.json());
app.use(cors());  // Utilisation de CORS

// Configuration de PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PwChappy',
  password: 'postgresql',
  port: 5432,
});

// Route pour créer un utilisateur
app.post('/api/users', async (req, res) => {
  const { firstandlastname, username, email, password, sex, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const client = await pool.connect();
    const queryText = 'INSERT INTO users (firstandlastname, username, email, password, sex, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [firstandlastname, username, email, hashedPassword, sex, role];
    const result = await client.query(queryText, values);
    const newUser = result.rows[0];
    client.release();
    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error adding user to PostgreSQL:', err);
    res.status(500).json({ error: 'Failed to add user' });
  }
});
// Route pour récupérer tous les utilisateurs
app.get('/api/users', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    client.release();
    res.json(users);
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs :', err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des utilisateurs' });
  }
});

// Route pour gérer l'authentification (login)
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Incorrect password' });
      return;
    }

    // Générer un token JWT pour l'utilisateur
    const token = jwt.sign({ userId: user.id, username: user.username }, 'sami89', { expiresIn: '1h' });

    client.release();
    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});


// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

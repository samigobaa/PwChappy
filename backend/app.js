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
// Middleware pour vérifier les tokens JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'sami89', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

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
// Route pour récupérer les informations de l'utilisateur connecté
app.get('/api/users/me', authenticateToken, async (req, res) => {
  const userId = req.user.userId; // Récupérer l'ID de l'utilisateur à partir du token JWT

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT id, firstandlastname, username, email, sex, role FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];
    client.release();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user); // Renvoyer les informations de l'utilisateur
  } catch (err) {
    console.error('Erreur lors de la récupération des informations de l\'utilisateur connecté :', err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des informations de l\'utilisateur connecté' });
  }
});


// Route pour gérer l'authentification (login)
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    console.log('user',user)

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
    const token = jwt.sign({ userId: user.id,role: user.role,firstandlastname:user.firstandlastname, username: user.username,sex:user.sex  }, 'sami89', { expiresIn: '1h' });

    client.release();
    res.status(200).json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});
// Route pour créer une publication avec l'utilisateur connecté
app.post('/api/posts', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId; // Récupère l'ID de l'utilisateur depuis le token JWT

  try {
    const client = await pool.connect();
    const queryText = 'INSERT INTO posts (content, user_id) VALUES ($1, $2) RETURNING *';
    const values = [content, userId];
    const result = await client.query(queryText, values);
    const newPost = result.rows[0];
    client.release();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('Failed to create post:', err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});
// Route pour récupérer toutes les publications
app.get('/api/posts', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM posts ORDER BY created_at DESC');
    const posts = result.rows;
    client.release();
    res.json(posts);
  } catch (err) {
    console.error('Failed to fetch posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});
// Route pour récupérer les publications d'un utilisateur spécifique
app.get('/api/users/:id/posts', async (req, res) => {
  const userId = req.params.id;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
    const posts = result.rows;
    client.release();

    if (posts.length === 0) {
      return res.status(404).json({ error: 'Aucune publication trouvée pour cet utilisateur' });
    }

    res.json(posts);
  } catch (err) {
    console.error('Échec de la récupération des publications de l\'utilisateur :', err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des publications de l\'utilisateur' });
  }
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

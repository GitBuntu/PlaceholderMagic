import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2/promise';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5242;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (token !== process.env.API_TOKEN) {
    return res.status(403).json({ error: 'Invalid token' });
  }

  next();
};

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get all databases
app.get('/databases', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query('SHOW DATABASES');
    const databases = rows.map(row => row.Database);
    res.json(databases);
  } catch (error) {
    console.error('Error fetching databases:', error);
    res.status(500).json({ error: 'Failed to fetch databases' });
  }
});

// Get schemas (in MySQL, schemas are the same as databases)
app.get('/databases/:database/schemas', authenticateToken, async (req, res) => {
  try {
    // In MySQL, schemas are the same as databases
    res.json([req.params.database]);
  } catch (error) {
    console.error('Error fetching schemas:', error);
    res.status(500).json({ error: 'Failed to fetch schemas' });
  }
});

// Get tables
app.get('/databases/:database/schemas/:schema/tables', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SHOW TABLES FROM ??',
      [req.params.database]
    );
    const tables = rows.map(row => Object.values(row)[0]);
    res.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    res.status(500).json({ error: 'Failed to fetch tables' });
  }
});

// Get columns
app.get('/databases/:database/schemas/:schema/tables/:table/columns', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SHOW COLUMNS FROM ??.??',
      [req.params.database, req.params.table]
    );
    const columns = rows.map(row => row.Field);
    res.json(columns);
  } catch (error) {
    console.error('Error fetching columns:', error);
    res.status(500).json({ error: 'Failed to fetch columns' });
  }
});

// Get preview data
app.get('/databases/:database/schemas/:schema/tables/:table/preview', authenticateToken, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM ??.?? LIMIT 1',
      [req.params.database, req.params.table]
    );
    res.json(rows[0] || {});
  } catch (error) {
    console.error('Error fetching preview data:', error);
    res.status(500).json({ error: 'Failed to fetch preview data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});

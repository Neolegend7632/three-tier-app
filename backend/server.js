const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Database Connection Pool ────────────────────────────────
let pool;

async function initDB() {
  try {
    pool = await mysql.createPool({
      host:     process.env.DB_HOST     || 'db',
      port:     process.env.DB_PORT     || 3306,
      database: process.env.DB_NAME     || 'tasksdb',
      user:     process.env.DB_USER     || 'appuser',
      password: process.env.DB_PASSWORD || 'apppassword',
      waitForConnections: true,
      connectionLimit: 10,
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id    INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        done  BOOLEAN      NOT NULL DEFAULT false
      )
    `);

    console.log('✅ MySQL connected and table ready');
  } catch (err) {
    console.error('❌ DB init error:', err.message);
    setTimeout(initDB, 3000);
  }
}

initDB();

// ── API Routes ──────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/tasks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const [result] = await pool.query(
      'INSERT INTO tasks (title) VALUES (?)', [title]
    );
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE tasks SET done = ? WHERE id = ?', [done, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Task not found' });
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(cors());
app.use(bodyParser.json());

app.get('/notes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM notes');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/notes', async (req, res) => {
  try {
    const { title, content } = req.body;
    const result = await pool.query(
      'INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.put('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const result = await pool.query(
      'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM notes WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

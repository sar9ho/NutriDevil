require('dotenv').config();

const pool = require('./db'); // import database connection
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authenticateAdmin = require('./authMiddleware');


const app = express(); //creates instance of express app 
const PORT = 5000; //port number where server will listen to incoming requests 

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes======================================================================================================

// get all restaurants
app.get('/restaurants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM restaurants');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// get meals for specific restaurant
app.get('/restaurants/:id/meals', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM meals WHERE restaurant_id = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// add new restaurant
//===== ADMIN ONLY
app.post('/restaurants', authenticateAdmin, async (req, res) => {
    const { name, location, hours } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO restaurants (name, location, hours) VALUES ($1, $2, $3) RETURNING *',
        [name, location, hours]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// delete a meal
//=== ADMIN ONLY
app.delete('/meals/:id', authenticateAdmin, async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM meals WHERE id = $1', [id]);
      res.json({ message: 'Meal deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
  
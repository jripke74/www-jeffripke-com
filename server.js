// require('dotenv').config();

const express = require("express");
// const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
// const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname))); // server static files (like index.html)

// PostgreSQl connection pool configuration
// const pool = new Pool({
//   user: process.env.DB_USERNAME,         // e.g., postres
//   host: 'localhost',
//   database: process.env.DB_NAME,        // e.g., userdb
//   password: process.env.DB_PASSWORD, // your postgres password
//   port: process.env.DB_PORT,                // default postres port
// });

// Test database connection on start up
// pool.connect()
//   .then(() => console.log('Connected to the PostgresSQL database'))
//   .catch(err => console.error('Failed to connect to the database', err.stack));

// Route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to handle form submission
// app.post('/submit-form', async (req, res) => {
//   const { title, releaseyear } = req.body;
//   try {
//     const query = 'INSERT INTO movies(titel, releaseyear) VALUES($1, $2) RETURNING *';
//     const values = [ title, releaseyear ];
//     const result = await pool.query(query, values);
//     console.log('Data inserted:', result.rows[0]);
//     res.status(200).send('Data submitted successfully!');
//   } catch (err) {
//     console.error('Error inserting data:', err.stack);
//     res.status(500).send('Error submitting data');
//   }
// });

app.listen(3000, () => {
  console.log('Server running on http://localhost:${port}');
});

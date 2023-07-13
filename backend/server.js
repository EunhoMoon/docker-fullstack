const express = require('express');
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

db.pool.query(
  `
  CREATE DATABASE myapp;
  `,
  (err, results, fields) => {
    console.log(results);
  }
);

db.pool.query(
  `
    CREATE TABLE myapp.lists (
        id INTEGER AUTO_INCREMENT,
        value TEXT,
        PRIMARY KEY (id)
    )
  `,
  (err, results, fields) => {
    console.log(results);
  }
);

app.get('/api/values', (req, res) => {
  db.pool.query('SELECT * FROM lists;', (err, results, fields) => {
    if (err) return res.status(500).send(err);
    return res.json(results);
  });
});

app.post('/api/values', (req, res) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES ('${req.body.value}');`,
    (err, results, fields) => {
      if (err) return res.status(500).send(err);
      return res.json({ success: true, value: req.body.value });
    }
  );
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

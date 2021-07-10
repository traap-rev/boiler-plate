require('dotenv').config;
const express = require("express");
const app = express();

const routes = require("./routes");
const db = require("./models");

db.sequelize.authenticate()
.then(() => {
  console.log('Connection established.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});


var port = process.env.PORT || 8080;

app.use('/', routes);

app.use((err, req, res, next) => { 
  res.status(err.status || 400).json({
    success: false,
    message: err.message || 'An error occured.',
    errors: err.error || [],
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found.' });
});


app.listen(() => {
  console.log('live on ' + port);
});

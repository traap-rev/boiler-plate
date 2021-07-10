import 'dotenv/config'
import express from "express";
var app = express();
/*
import typeorm from "typeorm";
const { createConnection } = typeorm
*/
import routes from "./routes/index.js";
import db from "./models";

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

/*
createConnection().then(async (connection) => {
  //console.warn(connection)
  app.listen(port);
  console.log('live on ' + port);
}).catch(err => {
  console.warn(err)
})
*/

app.listen(port);
console.log('live on ' + port);

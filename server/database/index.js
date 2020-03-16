const mysql = require("mysql");

var dbConnection = mysql.createConnection({
  user: "root",
  database: "music"
});

dbConnection.connect();
module.exports = dbConnection;

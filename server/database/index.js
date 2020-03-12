const mysql = require("mysql");

var dbConnection = mysql.createConnection({
  user: "root",
  database: "notSoundCloud"
});

dbConnection.connect();
module.exports = dbConnection;

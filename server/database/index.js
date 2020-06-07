const mysql = require("mysql");

// mysql://b3aa93e954fa25:ec1cb49a@us-cdbr-iron-east-01.cleardb.net/heroku_d0711f977976817?reconnect=true
try {
  var dbPool = mysql.createPool({
    connectionLimit: 10,
    host: "us-cdbr-iron-east-01.cleardb.net",
    user: "b3aa93e954fa25",
    password: "ec1cb49a",
    database: "heroku_d0711f977976817",
  });
} catch (e) {
  console.log("mysql create connection error: ", e);
}

// dbPool.connect(function (err) {
//   if (err) {
//     console.log("failed to connect to db: ", err);
//   }
// });

module.exports = dbPool;

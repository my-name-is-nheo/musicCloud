const mysql = require("mysql");

// mysql://b3aa93e954fa25:ec1cb49a@us-cdbr-iron-east-01.cleardb.net/heroku_d0711f977976817?reconnect=true
var db_config = {
  host: "us-cdbr-iron-east-01.cleardb.net",
  user: "b3aa93e954fa25",
  password: "ec1cb49a",
  database: "heroku_d0711f977976817",
};
var connection;
function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function (err) {
    if (err) {
      console.log("error connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", function (err) {
    console.log(`db error`, err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

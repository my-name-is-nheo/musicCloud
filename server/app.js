const express = require("express");
const app = express();
const port = 4000;
const db = require("./database/index.js");
const path = require("path");
const config = require("../config.js");
const SongHandler = require("./controller/index");

// console.log(__dirname);
// any middlewares?
// app.use(require("body-parser").json()); // wow.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended: true }));

// seting up s3 credentials

app.get("/shuffle", SongHandler.getRandomSong);

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

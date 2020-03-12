const express = require("express");
const app = express();
const port = 4000;
const path = require("path");

console.log(__dirname);
// any middlewares?
// app.use(require("body-parser").json()); // wow.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.urlencoded({ extended: true }));

app.listen(port, function() {
  console.log(`listening on port ${port}!`);
});

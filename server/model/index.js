var db = require("../database/index.js");
module.exports = {
  songs: {
    getPlaylist: (callback) => {
      console.log(db);
      var queryString = "select * from songList";
      // randomize the sqlChart.
      return db.query(queryString, function (err, results) {
        console.log(results);
        if (err) {
          throw err;
        }
        callback(results);
      });
    },
  },
};

var db = require("../database/index.js");
module.exports = {
  songs: {
    getPlaylist: (callback) => {
      var queryString = "select * from songList";
      // randomize the sqlChart.
      return db.query(queryString, function (err, results) {
        if (err) {
          console.log(err, " in line 9 of model/index.js");
          throw err;
        }
        callback(results);
      });
    },
  },
};

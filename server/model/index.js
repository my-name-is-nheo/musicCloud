var db = require("../database");
module.exports = {
  songs: {
    shuffle: callback => {
      var queryString =
        "select music_url from songList order by rand() limit 1";
      // randomize the sqlChart.
      return db.query(queryString, function(err, results) {
        if (err) {
          throw err;
        }
        callback(results);
      });
    }
  }
};

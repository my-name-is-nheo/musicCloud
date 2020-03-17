var db = require("../database");
module.exports = {
  songs: {
    getPlaylist: callback => {
      var queryString = "select * from songList";
      // randomize the sqlChart.
      return db.query(queryString, function(err, results) {
        console.log(` this is results in model ` + results);
        if (err) {
          throw err;
        }
        callback(results);
      });
    }
  }
};

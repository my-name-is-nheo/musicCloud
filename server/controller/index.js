var model = require("../model/index.js");
const SongHandler = {
  getSong: (req, res, next) => {
    console.log(`here's a random queen song `);
    model.songs.getPlaylist((err, data) => {
      if (err) {
        throw err;
        console.log(err, "in line 9 controller");
      }
      res.send(data);
    });
  },
};

module.exports = SongHandler;

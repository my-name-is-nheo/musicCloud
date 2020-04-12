var model = require("../model/index.js");
const SongHandler = {
  getSong: (req, res, next) => {
    console.log(`here's a random queen song `);
    model.songs.getPlaylist((data) => {
      res.json(data);
    });
  },
};

module.exports = SongHandler;

var model = require("../model/index.js");
const SongHandler = {
  getSong: (req, res, next) => {
    console.log(`here's a random queen song `);
    model.songs.getPlaylist((err, data) => {
      // console.log(data);
      if (err) {
        throw err;
      }
      res.send(data);
      // console.log(JSON.stringify(data));
    });
  },
};

module.exports = SongHandler;

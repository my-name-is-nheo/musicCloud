var model = require("../model/index.js");
const SongHandler = {
  getRandomSong: (req, res, next) => {
    console.log(`here's a random queen song `);
    model.songs.shuffle(data => {
      console.log(data);
      res.send(data);
      // console.log(JSON.stringify(data));
    });
  }
};

module.exports = SongHandler;

CREATE DATABASE music;

USE music;

CREATE TABLE songList (
  id INTEGER AUTO_INCREMENT,
  music_title VARCHAR(100) NOT NULL,
  artist_name VARCHAR(100) NOT NULL,
  album_cover VARCHAR(250) NOT NULL,
  music_url VARCHAR(300) NOT NULL,
  PRIMARY KEY (id)
);


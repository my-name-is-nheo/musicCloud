CREATE DATABASE music;

USE music;

CREATE TABLE songList (

  music_id int NOT NULL AUTO_INCREMENT,
  music_title varchar(100) NOT NULL,
  artist_name varchar(100) NOT NULL,
  album_cover varchar(250) NOT NULL,
  PRIMARY KEY (music_id)
);
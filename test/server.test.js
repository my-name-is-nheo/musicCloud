// test("adds 1 + 2 to equal 3", () => {
//   expect(1 + 2).toBe(3);
// });
// test("adds 2 + 2 to equal 4", () => {
//   expect(2 + 2).toBe(4);
// });

const axios = require("axios");

var instance = axios.create({
  baseURL: "http://localhost:4000/"
});

test("data from get request should not empty", async () => {
  const { data, status } = await instance.get("/getList");

  expect(status).toBe(200);
  // console.log(status);
  expect(data.length).not.toBe(0);
});

test("get request should return object with music data", async () => {
  const { data, status } = await instance.get("/getList");
  expect(status).toBe(200);
  for (var index = 0; index < data.length; index++) {
    // console.log(data[index]);
    expect(data[index]).toHaveProperty("id");
    expect(data[index]).toHaveProperty("music_title");
    expect(data[index]).toHaveProperty("artist_name");
    expect(data[index]).toHaveProperty(
      "album_cover",
      "https://my-music-lists.s3.amazonaws.com/00-queen.jpg"
    );
    expect(data[index]).toHaveProperty("music_url");
  }
});

test("there shouldn't be any empty strings or null in data from database", async () => {
  const { data, status } = await instance.get("/getList");
  expect(status).toBe(200);
  for (var index = 0; index < data.length; index++) {
    expect(data[index].id).not.toBe("" || null);
    expect(data[index].music_title).not.toBe("" || null);
    expect(data[index].artist_name).not.toBe("" || null);
    expect(data[index].album_cover).not.toBe("" || null);
    expect(data[index].music_url).not.toBe("" || null);
  }
});

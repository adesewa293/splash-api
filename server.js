const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

const port = process.env.PORT || 8090;
const ACCESS_KEY = process.env.ACCESS_KEY;

const app = express();

app.use(cors());

app.get("/", async (req, res) => {
  res.status(200).json("Hello World!");
});

app.get("/photos", async (request, response) => {
  console.log("ACCESS_KEY", ACCESS_KEY);
  const subject= request.query.subject
  const API = `https://api.unsplash.com/search/photos/?query=${subject}&client_id=${ACCESS_KEY}`;
  try {
    const res = await axios.get(API);
    console.log(res.data.results)
    console.log(res.data.results[0].urls)
    const photos = res.data.results.map((photo)=>{
      return {
      id: photo.id,
      img_url: photo.urls.regular,
      original_image: photo.links.self,
      photographer: photo.user.name,}
    })
    console.log('photos', photos)
    response.send(photos);
  } catch (error) {
    console.log("error", error.response.data);
  response.status(400).json("error");

  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

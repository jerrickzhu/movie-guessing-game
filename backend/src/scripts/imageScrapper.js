const axios = require("axios");
const cheerio = require("cheerio");

const URL = "http://film-grab.com/?random";

async function getHTML() {
  try {
    const { data: html } = await axios.get(URL);
    return html;
  } catch (error) {
    throw error;
  }
}

function initializeScript() {
  getHTML().then((res) => {
    const $ = cheerio.load(res);
    const title = $(".entry-title").first().text();
    const nestedMovieImageATags = $("#bwg_thumbnails_masonry_0 .bwg-item a");
    const pattern = /Year: \d{4}/;
    const year = $(".entry-content p")
      .filter(function () {
        return pattern.test($(this).text());
      })
      .text();

    const movieImages = [];
    const movieData = { movieImages, title, year };

    nestedMovieImageATags.each((i, element) => {
      const href = $(element).attr("href");
      movieImages.push(href);
    });

    axios
      .post("http://localhost:3000", JSON.stringify(movieData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        throw error;
      });
  });
}

module.exports = initializeScript;

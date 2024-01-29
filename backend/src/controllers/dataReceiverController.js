const axios = require("axios");
const apiService = require("../services/apiService");
const {
  getRandomImages,
  removeSpecificWords,
} = require("../utils/helperFunctions");

let scriptData;
let dataReceived = false;

async function receiveData(req, res) {
  try {
    console.log(scriptData);
    const receivedData = req.body;
    console.log("Data has been received");
    dataReceived = true;
    console.log(receivedData);
    const extractedNumber = receivedData.year.match(/\d+/);
    const year = extractedNumber ? extractedNumber[0] : null;
    let movieDataByTitle;
    let movieDetails;
    let fiveImages;

    try {
      movieDataFromTitle = await apiService.retrieveMovieFromTitle(
        receivedData.title,
        year
      );
    } catch (error) {
      movieDataByTitle = {
        title: "Chungking Express",
        releaseDate: "1994",
        id: 12345,
      };
    }

    try {
      movieDetails = await apiService.retrieveMovieDetails(
        movieDataFromTitle.id
      );
      fiveImages = await getRandomImages(receivedData.movieImages, 5);
    } catch (error) {
      movieDetails = {
        genres: [{ name: "Drama/Comedy/Romance" }],
        overview:
          "A lovelorn cop tries to find a new girlfriend, and a quirky restaurant worker is obsessed with California and a certain cop whom she stalks.",
      };
      fiveImages = [
        "https://film-grab.com/wp-content/uploads/photo-gallery/10(244).jpg?bwg=1547204683",
        "https://film-grab.com/wp-content/uploads/photo-gallery/22(244).jpg?bwg=1547204684",
        "https://film-grab.com/wp-content/uploads/photo-gallery/28(244).jpg?bwg=1547204684",
        "https://film-grab.com/wp-content/uploads/photo-gallery/46(239).jpg?bwg=1547204683",
        "https://film-grab.com/wp-content/uploads/photo-gallery/58(221).jpg?bwg=1547204683",
      ];
    }

    const payload = {
      images: fiveImages,
      genre: movieDetails.genres[0].name,
      synopsis: movieDetails.overview,
      year: year,
      title: decodeURIComponent(receivedData.title),
    };

    scriptData = payload;
  } catch (error) {
    throw error;
  }
}

async function getData(req, res) {
  try {
    if (dataReceived === false) {
      res.status(404).json({ error: "Data not found." });
      return;
    } else {
      res.setHeader("Cache-Control", "no-store");
      res.status(200).json({ message: "Data has been sent!", scriptData });
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getData,
  receiveData,
};

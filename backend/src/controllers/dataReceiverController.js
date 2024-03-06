const axios = require("axios");
const apiService = require("../services/apiService");
const {
  getRandomImages,
  removeSpecificWords,
} = require("../utils/helperFunctions");

let scriptData;
let dataReceived = false; // Assuming this variable is defined somewhere in your code

async function getMovieDataFromTitle(title, year) {
  let movieDataFromTitle;
  try {
    movieDataFromTitle = await apiService.retrieveMovieFromTitle(title, year);
    if (movieDataFromTitle === undefined) {
      throw new Error("Movie retrieval is undefined");
    }
  } catch (error) {
    // Handle error when retrieving movie data by title
    movieDataFromTitle = {
      title: "Chungking Express",
      releaseDate: "1994",
      id: 11104,
    };
    console.log(movieDataFromTitle);
  }
  return movieDataFromTitle;
}

async function getMovieDetails(id, movieImages) {
  let movieDetails;
  try {
    movieDetails = await apiService.retrieveMovieDetails(id);
    if (movieDetails === undefined) {
      throw new Error("Undefined result");
    } else {
      fiveImages = await getRandomImages(movieImages, 5);
    }
  } catch (error) {
    // Handle error when retrieving movie details or images
    console.error(
      "Using backup. Error retrieving movie details or images:",
      error
    );
    movieDetails = {
      genres: [{ name: "Drama/Comedy/Romance" }],
      overview:
        "A lovelorn cop falls in love with a criminal, and a quirky restaurant worker is obsessed with California and a certain cop whom she stalks.",
    };
    fiveImages = [
      "https://film-grab.com/wp-content/uploads/photo-gallery/10(244).jpg?bwg=1547204683",
      "https://film-grab.com/wp-content/uploads/photo-gallery/22(244).jpg?bwg=1547204684",
      "https://film-grab.com/wp-content/uploads/photo-gallery/28(244).jpg?bwg=1547204684",
      "https://film-grab.com/wp-content/uploads/photo-gallery/46(239).jpg?bwg=1547204683",
      "https://film-grab.com/wp-content/uploads/photo-gallery/58(221).jpg?bwg=1547204683",
    ];
  }
  return { movieDetails, fiveImages };
}

async function receiveData(req, res) {
  const receivedData = req.body;
  console.log("Data has been received");
  dataReceived = true;
  const extractedNumber = receivedData.year.match(/\d+/);
  const year = extractedNumber ? extractedNumber[0] : null;
  let movieDataFromTitle;
  let movieDetails;

  movieDataFromTitle = await getMovieDataFromTitle(receivedData.title, year);

  movieDetails = await getMovieDetails(
    movieDataFromTitle.id,
    receivedData.movieImages
  );

  const payload = {
    images: movieDetails.fiveImages,
    genre: movieDetails.movieDetails.genres[0].name,
    synopsis: movieDetails.movieDetails.overview,
    year: movieDataFromTitle.releaseDate,
    title: decodeURIComponent(movieDataFromTitle.title),
  };

  scriptData = payload;
  console.log(scriptData);
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

const axios = require("axios");
const { bearerToken } = require("../../config");
const URL = "https://api.themoviedb.org/3";

const header = {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
};

/**
 * Function that retrieves movie information by using the title.
 * @param {string} title - URI encoded title
 * @param {string} year - string of year
 * @returns - Object of data
 */
async function retrieveMovieFromTitle(title, year) {
  try {
    const movieDataByTitle = await axios.get(
      `${URL}/search/movie?query=${title}&year=${year}`,
      header
    );

    if (movieDataByTitle.data.results.length > 0) {
      const decodedTitle = decodeURIComponent(title);

      const matchingMovie = movieDataByTitle.data.results.find(
        (movie) => movie.title === decodedTitle
      );

      if (matchingMovie) {
        return {
          title: matchingMovie.title,
          releaseDate: matchingMovie.release_date,
          id: matchingMovie.id,
        };
      } else {
        return { error: "Could not find a matching movie!" };
      }
    }
  } catch (error) {
    throw error;
  }
}

/**
 * Function to retrive movie image so user may guess it.
 * @return {Promise<any>} - A promise that resolves to provide movie images (at most 5).
 */
async function retrieveMovieImages(id) {
  const baseUrl = "https://image.tmdb.org/t/p/";
  try {
    const movieImages = await axios.get(`${URL}/movie/${id}/images`, header);
    return movieImages.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Function that retrives movie details to provide hints to users if they cannot guess movie by the image.
 * @returns {Promise<any>} - A promise that resolves to provide data about the movie with the id from the latest movie of the day.
 */
async function retrieveMovieDetails(id) {
  try {
    const movieDetails = await axios.get(`${URL}/movie/${id}`, header);
    return movieDetails.data;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  retrieveMovieFromTitle,
  retrieveMovieDetails,
  retrieveMovieImages,
};

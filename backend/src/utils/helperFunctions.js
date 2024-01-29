function getRandomImages(images, count) {
  const lengthOfImages = images.length - 1;
  const selectedImages = [];
  const prevNumbers = [];
  let counter = 0;

  while (counter !== count) {
    const randomIndex =
      Math.floor(Math.random() * (lengthOfImages - 0 + 1)) + 0;
    if (!prevNumbers.includes(randomIndex)) {
      selectedImages.push(images[randomIndex]);
      prevNumbers.push(randomIndex);
      counter++;
    }
  }

  return selectedImages;
}

function removeSpecificWords(inputString, wordsToRemove) {
  // Ensure that wordsToRemove is an array
  if (!Array.isArray(wordsToRemove)) {
    console.error("Error: wordsToRemove must be an array.");
    return inputString; // Return the original string in case of an error
  }

  // Create a regular expression pattern with the specified words
  const pattern = new RegExp(`\\b(${wordsToRemove.join("|")})\\b`, "gi");

  // Use the replace method to remove the specified words
  const result = inputString.replace(pattern, "");

  return result;
}

module.exports = {
  getRandomImages,
  removeSpecificWords,
};

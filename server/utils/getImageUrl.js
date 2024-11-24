function getImageUrl(fileName) {
  const fileURL = `${process.env.BASE_URL}/${fileName}`;
  return fileURL;
}

module.exports = getImageUrl;

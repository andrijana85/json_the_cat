const request = require('request');

const breed = process.argv.slice(2);

const fetchBreedDescription = function(breedName, callback) {
// fetch the data from the API endpoint using request
  request.get(`https://api.thecatapi.com/v1/breeds/search?q=${breed}`,(error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (body) {
    // use JSON.parse to convert the JSON string into an actual object
      const data = JSON.parse(body);
      console.log(data);
      // console.log(typeof data);
      // access the first entry in the data array and print out the description
      const firstBreed = data[0];
      console.log(firstBreed.description);

      if (data.length === 0) {
        callback(`Sorry.The requested breed ${breed} is not found`, null);
        return;
      }
      callback(null, data[0].description);
    }
   

  });
};

module.exports = { fetchBreedDescription };
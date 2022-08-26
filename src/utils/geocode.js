const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmluaG50MSIsImEiOiJjbDc3aHFsanAwcGozM25xaHp1ZjhlenhvIn0.q7r_M9FjBvY462ZRvYHRqw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geocoding service!");
    } else if (body.features.length === 0) {
      callback("Unable to find location, please try another search term.");
    } else {
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      const location = body.features[0].place_name;
      callback(undefined, {
        latitude: latitude,
        longitude: longitude,
        location: location,
      });
    }
  });
};

module.exports = geocode;

const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=9fc1e88edd5b4932a8d816e84afaefc6&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location!");
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;

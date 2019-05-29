const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/4b6d3ccb457bf12b8f89459d7dd8290c/' +
    latitude +
    ',' +
    longitude +
    '?exclude=minutely,hourly,daily,alerts,flags';
  // "'";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to weather service.', undefined);
    }

    if (body.error) {
      return callback(
        'The weather request failed with the following error(s): ' + body.error,
        undefined
      );
    }

    callback(
      undefined,
      'The current weather condition is "' +
        body.currently.summary +
        '".  It is  ' +
        body.currently.temperature +
        ' degrees out.  And there is a ' +
        body.currently.precipProbability +
        '% chance of rain.'
    );
  });
};

// forecast(40.73, -73.99, (error, data) => {
//   console.log('Error', error);
//   console.log('Data', data);
// });

module.exports = forecast;

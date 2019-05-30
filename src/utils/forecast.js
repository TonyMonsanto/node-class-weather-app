const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/4b6d3ccb457bf12b8f89459d7dd8290c/' +
    latitude +
    ',' +
    longitude +
    '?exclude=minutely,hourly,alerts,flags';

  request({ url, json: true }, (error, { body } = {}) => {
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
      body.daily.data[0].summary +
        '  The current weather condition is "' +
        body.currently.summary +
        '".  It is currently ' +
        body.currently.temperature +
        ' degrees.  Today the high temperature will be ' +
        body.daily.data[0].temperatureHigh +
        ' and the low will be ' +
        body.daily.data[0].temperatureLow +
        '.  For the area there is a ' +
        body.daily.data[0].precipProbability +
        '% chance of ' +
        body.daily.data[0].precipType +
        ' today.'
    );
  });
};

module.exports = forecast;

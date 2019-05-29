const request = require('request');

const geocode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1IjoidG1vbnNhbnRvIiwiYSI6ImNqdzNsenR4OTBjNWozemw5MHB0MG5tZGkifQ.htRlip_x3xlbmHuRtpdWuQ';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to geocode service.', undefined);
    }

    if (body.features.length === 0) {
      return callback(
        'The geocode request failed. Try another search.',
        undefined
      );
    }

    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name
    });
  });
};

// geocode('10003', (error, data) => {
//   console.log('Error', error);
//   console.log('Data', data);
// });

module.exports = geocode;

const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//define paths
const dirPublic = path.join(__dirname, '../public');
const dirViews = path.join(__dirname, '../templates/views');
const dirPartials = path.join(__dirname, '../templates/partials');

//setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', dirViews);
hbs.registerPartials(dirPartials);

//set up static directory
app.use(express.static(dirPublic));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Rendered Weather',
    author: 'Tony Monsanto'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rendered About Page',
    author: 'Tony Monsanto'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Rendered Help Page',
    author: 'Tony Monsanto',
    message: 'Welcome to the Help Page.'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send('Please provide a location.');
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return console.log(error);
        }
        res.send({
          location,
          forecast: forecastData,
          query: req.query.address
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term.'
    });
  }
  console.log(req.query);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help Page Not Found',
    name: 'Help Page Not Found',
    message: 'This Help page was not found.',
    author: 'Tony Monsanto'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page Not Found',
    name: 'Page Not Found',
    message: 'This page was not found.',
    author: 'Tony Monsanto'
  });
});
app.listen(port, () => console.log('Listening on port ' + port + ' . . .'));

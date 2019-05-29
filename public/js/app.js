const formWeather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

formWeather.addEventListener('submit', e => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Getting the latest forecast . . . ';
  messageTwo.textContent = '';

  fetch('http://localhost:3000/weather/?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = '';
      }
      messageOne.textContent = data.location;
      messageTwo.textContent = data.forecast;
    });
  });

  console.log(location);
});

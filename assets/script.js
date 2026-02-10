var apiKey = '27da1b6b8afe49d591e32324260902';
var searchLocation = '99008';
var forecastData = `http://api.weatherapi.com/v1/forecast.json?q=${searchLocation}&days=6&key=${apiKey}`;

var searchBtn = document.querySelector('#search-btn');
var searchTxt = document.querySelector('#search-text');

var currentForecast = document.querySelector('#current-forecast');
var fiveDayForecast = document.querySelector('#five-day-forecast');

function setSearchResults() {
  searchBtn.addEventListener('click', function () {
    if (!searchTxt.value) {
      return;
    } else {
      searchLocation = searchTxt.value;
      searchTxt.value = '';
      handleSearchResults();
    }
  });
}

function handleSearchResults() {
  fetch(forecastData)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data.forecast.forecastday);
      data.forecast.forecastday.forEach(function (e) {
        // Create elements for date, temp, condition icon, humidity & wind speed
        newDateH2 = document.createElement('h2');
        newIcon = document.createElement('img');
        newTempH3 = document.createElement('h3');
        newHumidH3 = document.createElement('h3');
        newWindSpH3 = document.createElement('h3');

        // Format Date
        formattedDate = dayjs(e.date).format('ddd MMM D');

        // Style elements for date, temp, condition icon, humidity & wind speed
        newDateH2.textContent = formattedDate;
        newIcon.setAttribute('src', e.day.condition.icon);
        newTempH3.textContent = `${e.day.avgtemp_f}°F`;
        newHumidH3.textContent = `Humidity: ${e.day.avghumidity}%`;
        newWindSpH3.textContent = `Wind: ${e.day.maxwind_mph} MPH`;

        // Append elements for date, temp, condition icon, humidity & wind speed
        if (dayjs(new Date()).format('ddd MMM D') === formattedDate) {
          currentForecast.appendChild(newDateH2);
          currentForecast.appendChild(newIcon);
          currentForecast.appendChild(newTempH3);
          currentForecast.appendChild(newHumidH3);
          currentForecast.appendChild(newWindSpH3);
        } else {
          // Create, style and append the forecast cards
          newDiv = document.createElement('div');
          newDiv.classList.add('forecast-card');
          fiveDayForecast.appendChild(newDiv);
          newDiv.appendChild(newDateH2);
          newDiv.appendChild(newIcon);
          newDiv.appendChild(newTempH3);
          newDiv.appendChild(newHumidH3);
          newDiv.appendChild(newWindSpH3);
        }
      });
    });
}

setSearchResults();

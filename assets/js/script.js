var pageStart = function () {
  // Variables and potential arrays that will be needed

  // current day information
  var currentWeatherImg = document.getElementById("current-weather-image");
  var currentTemp = document.getElementById("temperature");
  var currentHumidity = document.getElementById("humidity");
  var currentWindSpeed = document.getElementById("wind-speed");
  var currentUVIndex = document.getElementById("UV-index");

  // search functionality information
  var chosenCity = document.getElementById("enter-city");
  var searchButton = document.getElementById("search-button");
  var clearButton = document.getElementById("clear-history");
  var chosenCityName = document.getElementById("city-name");
  var searchHistory = document.getElementById("city-history");

  // Five day forecast element / current weather element
  var fiveDayForecast = document.getElementById("five-day-box");
  var currentWeather = document.getElementById("current-weather");
  var userSearchHistory = JSON.parse(localStorage.getItem("search")) || [];

  // Get the API key and assign it a variable.
  var openWeatherAPIKey = "ab616e87112839dadb80a8304e9cff29";

  // Get the current weather from open weather api
  var findWeatherForChosenCity = function (cityName) {
    var cityUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      openWeatherAPIKey;
    //axios is a form of node.JS used from a tutorial from youtube to get working properly.
    axios.get(cityUrl)
    .then(function (response) {
      currentWeather.classList.remove("d-none");

      //Display the current weather
      var currentDate = new Date(response.data.dt * 1000);
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();

      chosenCityName.innerHTML =
        response.data.name + " (" + month + "/" + day + "/" + year + ") ";
      var weatherImage = response.data.weather[0].icon;
      currentWeatherImg.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + weatherImage + "@2x.png"
      );
      currentWeatherImg.setAttribute(
        "alt",
        response.data.weather[0].description
      );
      currentTemp.innerHTML =
        "Temperature: " + response.data.main.temp + " &#176f";
      currentHumidity.innerHTML =
        "Humidity: " + response.data.main.humidity + "%";
      currentWindSpeed.innerHTML =
        "Wind Speed: " + response.data.wind.speed + "MPH";

      // Get UVINDEX and assign colors based on severity
      var lattitude = response.data.coord.lat;
      var longitude = response.data.coord.lon;
      var UVIndexUrl =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        lattitude +
        "&lon=" +
        longitude +
        "&appid=" +
        openWeatherAPIKey +
        "&cnt=1";

      axios.get(UVIndexUrl).then(function (response) {
        var UVIndex = document.createElement("span");

        //set the colors based on severity
        if (response.data[0].value < 4) {
          UVIndex.setAttribute("class", "badge badge-success");
        } else if (response.data[0].value < 8) {
          UVIndex.setAttribute("class", "badge badge-warning");
        } else {
          UVIndex.setAttribute("class", "badge badge-danger");
        }
        UVIndex.innerHTML = response.data[0].value;
        currentUVIndex.innerHTML = "UV Index: ";
        currentUVIndex.append(UVIndex);
      });

      // Get the 5 day forecast for the specific city entered

      var cityInfo = response.data.id;
      var fiveDayUrl =
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
        cityInfo +
        "&appid=" +
        openWeatherAPIKey;

      axios.get(fiveDayUrl).then(function (response) {
        fiveDayForecast.classList.remove("d-none");

        //   Display forecast for the next five days
        var forecast = document.querySelectorAll(".forecast");
        for (i = 0; i < forecast.length; i++) {
          forecast[i].innerHTML = "";
          var forecastIndex = i * 8 + 4;
          var forecastDate = new Date(
            response.data.list[forecastIndex].dt * 1000
          );
          var forecastMonth = forecastDate.getMonth() + 1;
          var forecastDay = forecastDate.getDate();
          var forecastYear = forecastDate.getFullYear();
          var forecastDateElement = document.createElement("p");

          forecastDateElement.setAttribute("class", "mt-3 mb-0 forecast-date");
          forecastDateElement.innerHTML =
            forecastMonth + "/" + forecastDay + "/" + forecastYear;
          forecast[i].append(forecastDateElement);

          // Display the icons for the weather
          var forecastWeatherElement = document.createElement("img");
          forecastWeatherElement.setAttribute(
            "src",
            "https://openweathermap.org/img/wn/" +
              response.data.list[forecastIndex].weather[0].icon +
              "@2x.png"
          );
          forecastWeatherElement.setAttribute(
            "alt",
            response.data.list[forecastIndex].weather[0].description
          );
          forecast[i].append(forecastWeatherElement);

          var forecastTemperatureElement = document.createElement("p");
          forecastTemperatureElement.innerHTML =
            "Temp: " + response.data.list[forecastIndex].main.temp + " &#176f";
          forecast[i].append(forecastTemperatureElement);

          var forecastHumidityElement = document.createElement("p");
          forecastHumidityElement.innerHTML =
            "Humidity: " +
            response.data.list[forecastIndex].main.humidity +
            "%";
          forecast[i].append(forecastHumidityElement);
        }
      });
    });
  };

  // Find the history from local storage
  searchButton.addEventListener("click", function () {
    var userSearch = chosenCity.value;
    findWeatherForChosenCity(userSearch);
    userSearchHistory.push(userSearch);
    localStorage.setItem("search", JSON.stringify(userSearchHistory));
    displaySearchHistory();
  });

  // Clear history button functionality
  clearButton.addEventListener("click", function () {
    localStorage.clear();
    userSearchHistory = [];
    displaySearchHistory();
  });

  // Render out the search history
  var displaySearchHistory = function () {
    searchHistory.innerHTML = "";
    for (let i = 0; i < userSearchHistory.length; i++) {
      const userHistory = document.createElement("input");
      userHistory.setAttribute("type", "text");
      userHistory.setAttribute("readonly", true);
      userHistory.setAttribute("class", "form-control d-block bg-white");
      userHistory.setAttribute("value", userSearchHistory[i]);
      userHistory.addEventListener("click", function () {
        findWeatherForChosenCity(userHistory.value);
      });
      searchHistory.append(userHistory);
    }
  };

  displaySearchHistory();

  if (userSearchHistory.length > 0) {
    findWeatherForChosenCity(userSearchHistory[userSearchHistory.length - 1]);
  }
};

pageStart();

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
  var searchHistory = document.getElementById("history");

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
    fetch(cityUrl).then(function (response) {
      currentWeather.classList.remove("d-none");

      //Display the current weather
      var currentDate = new Date(response.formData.dt * 1000);
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

      fetch(UVIndexUrl).then(function (response) {
          var UVIndex = document.createElement("span");

          //set the colors based on severity
          if (response.data[0].value < 4) {
              UVIndex.setAttribute("class", "badge badge-success");
          } else if (response.data[0].value < 8) {
              UVIndex.setAttribute("class", "badge badge-warning");
          }else {
              UVIndex.setAttribute("class", "badge badge-danger");
          }
      });
    });
  };

  // Get the 5 day forecast for the specific city entered

  // Find the history from local storage

  // Render out the search history

  // Clear history button functionality
};

pageStart();

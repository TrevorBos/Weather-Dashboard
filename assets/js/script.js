var pageStart = function () {

    // Variables and potential arrays that will be needed
    
    // current day information
    var currentWeatherImg = document.getElementById ("current-weather-image");
    var currentTemp = document.getElementById ("temperature");
    var currentHumidity = document.getElementById ("humidity");
    var currentWindSpeed = document.getElementById ("wind-speed");
    var currentUVIndex = document.getElementById ("UV-index");

    // search functionality information
    var chosenCity = document.getElementById ("enter-city");
    var searchButton = document.getElementById ("search-button");
    var clearButton = document.getElementById ("clear-history");
    var chosenCityName = document.getElementById ("city-name");
    var searchHistory = document.getElementById ("history");

    // Five day forecast element / current weather element
    var fiveDayForecast = document.getElementById ("five-day-box");
    var currentWeather = document.getElementById ("current-weather");
    var userSearchHistory = JSON.parse(localStorage.getItem("search")) || [];

    // Get the API key and assign it a variable.
    var openWeatherAPIKey = "ab616e87112839dadb80a8304e9cff29";

    // Get the current weather from open weather api

    // Get the 5 day forecast for the specific city entered

    // Find the history from local storage
    
    // Render out the search history

    // Clear history button functionality


}

pageStart ();
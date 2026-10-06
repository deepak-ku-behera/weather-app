
// const API_KEY = "254366d98e417068b821e3663b4ae462";
const apiKey = "8dc06e7a1ab2a840aaae4064b96c5d00";
const searchInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");

// Search button
searchButton.addEventListener("click", searchWeather);

// Press Enter to search
searchInput.addEventListener("keypress", function (event) {

if (event.key === "Enter") {
    searchWeather();
}

});

async function searchWeather() {

const city = searchInput.value.trim();

// Check empty input
if (city === "") {
    alert("Please enter a city name");
    return;
}


try {
    // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=254366d98e417068b821e3663b4ae462`
    // );
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${(city)}&appid=${apiKey}`
    );


    // Check API response
    if (!response.ok) {

        if (response.status === 401) {
            throw new Error("Invalid API key");
        }

        if (response.status === 404) {
            throw new Error("City not found");
        }

        throw new Error("Something went wrong");

    }


    const data = await response.json();


    // City and country
    cityName.textContent = data.name;



    // Temperature
    temperature.textContent =
        `${Math.round(data.main.temp)}°C`;


    // Weather condition
    condition.textContent =
        data.weather[0].main;


    // Weather icon
    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherIcon.alt =
        data.weather[0].description;


    // Humidity
    humidity.textContent =
        `${data.main.humidity}%`;


    // Wind speed
    windSpeed.textContent =
        `${(data.wind.speed * 3.6).toFixed(1)} km/h`;


    // Feels like temperature
    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;


    // Clear search box
    searchInput.value = "";


} catch (error) {

    alert(error.message);

}

}

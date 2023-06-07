// Get weather data
const apiKey = '18e878f038df535000f044d97f7ec16c';
async function fetchData(city) {
    try {
        const cityResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        const location = await cityResponse.json();
        const { lat, lon } = location[0];
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        showWeather(weatherData);
    } catch (error) {
        console.log(error);
    }
}

// City search and data
const searchCity = document.getElementById('city');
const weatherBox = document.getElementById('weather_box');
const city = localStorage.getItem('city');
searchCity.value = city;

if (city === null) {
    weatherBox.style.display = 'none';
    weatherBox.style.height = 0;
} else {
    fetchData(searchCity.value);
    weatherBox.style.display = 'block';
    weatherBox.style.height = 'auto';
}

function saveCity() {
    localStorage.setItem('city', searchCity.value);
}

searchCity.addEventListener('input', (() => {
    searchCity.value = searchCity.value.toUpperCase();
}));

searchCity.addEventListener('change', (() => {
    saveCity();
    fetchData(searchCity.value);
    weatherBox.style.display = 'block';
    weatherBox.style.height = 'auto';
}));

// Show weather
const weatherIcon = document.getElementById('weather_icon');
const weatherTemperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('description');

function showWeather(weatherData) {
    weatherIcon.src = `img/${weatherData.weather[0].icon}.svg`;
    weatherTemperature.innerHTML = `${Math.trunc(weatherData.main.temp)}°C`;
    weatherDescription.innerHTML = `${weatherData.weather[0].description}`;
}


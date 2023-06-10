// Get weather data
const apiKey = 'YOUR_API_KEY';
async function fetchData(city) {
    if (city === '') {
        hide();
        return;
    }
    try {
        const cityResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        const location = await cityResponse.json();
        const { lat, lon } = location[0];
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const weatherData = await weatherResponse.json();
        await showWeather(weatherData);
    } catch (error) {
        console.log(error);
        errorShow();
    }
}

// City search and data
const card = document.querySelector('.card');
const fade = document.querySelectorAll('.fade');
const wrapper = document.querySelector('.wrapper');
const searchCity = document.getElementById('city');
const weatherBox = document.getElementById('weather_box');
const city = localStorage.getItem('city');
searchCity.value = city;

checkCity();
function checkCity() {
    if (searchCity.value === '') {
        hide();
    } else {
        fetchData(searchCity.value);
        show();
    }
}

function saveCity() {
    if (searchCity.value === '') {
        localStorage.removeItem('city');
    } else {
        localStorage.setItem('city', searchCity.value);
    }
}

searchCity.addEventListener('change', (() => {
    checkCity();
    saveCity();
}));

searchCity.addEventListener('input', (() => {
    if (searchCity.value === '') {
        hide();
    }
}));

// Show weather
const weatherIcon = document.getElementById('weather_icon');
const weatherTemperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('description');
const weatherHumidity = document.getElementById('humidity');
const weatherAirPressure = document.getElementById('air_pressure');

function showWeather(weatherData) {
    weatherIcon.src = `img/${weatherData.weather[0].icon}.svg`;
    weatherTemperature.innerHTML = `${Math.trunc(weatherData.main.temp)}°C`;
    const description = weatherData.weather[0].description;
    weatherDescription.innerHTML = `${description.charAt(0).toUpperCase() + description.slice(1)}`;
    weatherHumidity.innerHTML = `${weatherData.main.humidity}%`;
    weatherAirPressure.innerHTML = `${weatherData.main.pressure}hPa`;
    show();
}

// Show & hide
function show() {
    card.style.height = '730px';
    weatherBox.style.visibility = 'visible';
    wrapper.style.opacity = 1;
    fade.forEach(item => {
        item.classList.add('show');
    })
}

function hide() {
    card.style.height = '100px';
    weatherBox.style.visibility = 'hidden';
    wrapper.style.opacity = 0;
    fade.forEach(item => {
        item.classList.remove('show');
    })
}

function errorShow() {
    card.style.height = '470px';
    weatherBox.style.visibility = 'visible';
    weatherIcon.src = `img/location.png`;
    wrapper.style.opacity = 0;
    weatherTemperature.innerHTML = ``;
    weatherDescription.innerHTML = ``;
}

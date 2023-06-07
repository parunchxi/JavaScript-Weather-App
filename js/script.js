const apiKey = '18e878f038df535000f044d97f7ec16c';
async function fetchData(city) {
    const cityResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=2&appid=${apiKey}`);
    const location = await cityResponse.json();
    const { lat, lon } = location[0];
    console.log(lat, lon);
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
}

fetchData('phayao');

const searchCity = document.getElementById('city')
searchCity.addEventListener('input', (() => searchCity.value = searchCity.value.toUpperCase()));
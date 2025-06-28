function reset() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('city').value = '';
    document.getElementById('display').innerHTML = '';
    document.getElementById('loading').innerHTML='';
}

function submit()
{
    const API_KEY = 'd50aadde086516638315fd55cdc2287e';
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const UNITS = 'metric'; 
    const city = document.getElementById('city').value;
    if (city === "") {
    const res=document.getElementById('result').innerHTML = "Please enter a valid city name.";
    return;
    }
    else
    {
        document.getElementById('result').innerHTML='';
    }

const url = `${API_URL}${city}&appid=d50aadde086516638315fd55cdc2287e&units=${UNITS}`;

document.getElementById('loading').innerHTML = "Loading weather data...";

fetch(url)
.then(res => res.json())
.then(data => displayWeather(data))
.catch(error => {
    document.getElementById('display').innerHTML = ' Unable to fetch data';
    console.error("Error fetching weather data: ", error);
    document.getElementById('loading').innerHTML='';
});
}

function displayWeather(data) {
const weatherDiv = document.getElementById('display');
const { name, sys, main, weather } = data;
const { temp, humidity } = main;
const { country } = sys;
const description = weather[0].description;
const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
document.getElementById('loading').innerHTML='';
weatherDiv.innerHTML = `
<div id="weather-info">
    <h2>${name}, ${country}</h2>
    <p><strong>Temperature:</strong> ${temp}°C</p>
    <p><strong>Weather:</strong> ${description}</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <img src="${icon}" alt="${description}" />
</div>
`;
}
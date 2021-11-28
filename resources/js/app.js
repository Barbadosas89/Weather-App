let fetchWeather = "/weather";

let weatherForm = document.querySelector('form');
let search = document.querySelector('input');

let weatherIcon = document.querySelector('.weatherIcon i');
let weatherCondition = document.querySelector('.weatherCondition');

let tempElement = document.querySelector('.temperature span');

let locationElement = document.querySelector('.place');

let dateElement = document.querySelector('.date');

let monthNames = ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    let locationApi = fetchWeather + "?places=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                if (data.description === "clear") {
                    weatherIcon.className = "wi wi-day-sunny"
                } else if (data.description === "isolated-clouds") {
                    weatherIcon.className = "wi wi-day-cloudy"
                } else if (data.description === "overcast") {
                    weatherIcon.className = "wi wi-day-sunny-overcast"
                } else if (data.description === "light-rain") {
                    weatherIcon.className = "wi wi-day-rain"
                } else if (data.description === "light-rain" || data.description === "moderate-rain" || data.description === "heavy-rain") {
                    weatherIcon.className = "wi wi-day-rain"
                } else if (data.description === "sleet") {
                    weatherIcon.className = "wi wi-day-sleet"
                } else if (data.description === "light-snow" || data.description === "moderate-snow" || data.description === "heavy-snow") {
                    weatherIcon.className = "wi wi-day-snow"
                } else if (data.description === "fog") {
                    weatherIcon.className = "wi wi-day-fog"
                } else {
                    weatherIcon.className = "wi wi-cloud-refresh"
                }
                locationElement.textContent = data.cityName;
                tempElement.textContent = data.temperature + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})
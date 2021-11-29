let request = require('request');
let constants = require('../config');


let weatherData = (places, callback) => {
    let url = constants.meteoltMap.base_url + encodeURIComponent(places) + constants.meteoltMap.city

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Nepavyksta pasiekti Meteo.lt ', undefined)
        } else if (!body.place || !body.place.name || !body.forecastTimestamps[0].airTemperature) {
            callback('Nepavyko rasti, iveskite teisinga miesto pavadinima!', undefined)

        } else {
            callback(undefined, {
                temperature: body.forecastTimestamps[0].airTemperature,
                description: body.forecastTimestamps[0].conditionCode,
                cityName: body.place.name
            })
        }
    })
}

module.exports = weatherData;

const request = require('request');
const config = require('../config');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${config.FORECAST_API_KEY}/${lat},${lng}?units=si&exclude=flags,daily,hourly`,
        json: true
    },(error, response, body) => {
        if (!error && response.statusCode === 200) {     
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        } else {
            callback('--- unable to fetch weather')
        }
    })
}

module.exports = {
    getWeather,
}
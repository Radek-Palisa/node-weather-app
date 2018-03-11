const yargs = require('yargs');
const axios = require('axios');
const config = require('./config');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch the weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.GEO_API_KEY}`;

axios.get(geocodeUrl)
    .then(response => {      
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('--- unable to find that address')
        }
        const lat = response.data.results[0].geometry.location.lat;
        const lng = response.data.results[0].geometry.location.lng;
        const weatherUrl = `https://api.darksky.net/forecast/${config.FORECAST_API_KEY}/${lat},${lng}?units=si&exclude=flags,daily,hourly`
        console.log('--- ' + response.data.results[0].formatted_address + ' ---');
        return axios.get(weatherUrl);
    })
    .then(response => {
        const summary = response.data.currently.summary;
        const temperature = response.data.currently.temperature;
        const apparentTemperature = response.data.currently.apparentTemperature;

        console.log(`It's currently ${summary}, ${temperature}°. It feels like ${apparentTemperature}°.`)
    })
    .catch(err => {
        if (err.code === 'ENOTFOUND') {
            console.log('--- unable to connect to API servers')
        } else {
            console.log(err.message)
        }
    })



const request = require('request');
const yargs = require('yargs');
const config = require('./config')

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

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(argv.address)}&key=${config.API_KEY}`,
    json: true
},(error, response, body) => {
    if (error) {
        console.log('--- unable to connect to Google servers')
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('--- unable to find that address')
    } else if (body.status === 'OK') {
        console.log('--- Address: ', body.results[0].formatted_address);
        console.log('--- Latituted: ', body.results[0].geometry.location.lat);
        console.log('--- Longitude: ', body.results[0].geometry.location.lng);
    }
})
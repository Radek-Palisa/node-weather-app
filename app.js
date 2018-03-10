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
    console.log('Address: ', body.results[0].formatted_address);
    console.log('Latituted: ', body.results[0].geometry.location.lat);
    console.log('Longitude: ', body.results[0].geometry.location.lng);
})
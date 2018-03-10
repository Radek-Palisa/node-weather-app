// const yargs = require('yargs');
// const geocode = require('./geocode/geocode');

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch the weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;

// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 4));
//     }
// });

const request = require('request');
const config = require('./config');


request({
    url: `https://api.darksky.net/forecast/${config.FORECAST_API_KEY}/41.3850639,2.1734035?units=si&exclude=flags,daily,hourly`,
    json: true
},(error, response, body) => {
    if (!error && response.statusCode === 200) {
        console.log(body)
    } else {
        console.log('--- unable to fetch weather')
    }
})
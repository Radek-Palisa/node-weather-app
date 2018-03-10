const request = require('request');
const config = require('../config');

const geocodeAddress = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${config.GEO_API_KEY}`,
        json: true
    },(error, response, body) => {
        if (error) {
            callback('--- unable to connect to Google servers')
        } else if (body.status === 'ZERO_RESULTS') {
            callback('--- unable to find that address')
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    })
}
module.exports = {
    geocodeAddress,
}

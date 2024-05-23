const axios = require('axios');


const getAddress = async (coordinates) => {
    const lat = coordinates.latitude;
    const lng = coordinates.longitude;

    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_GEOCODE_API}`
    );

    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error(`Unable to find address`);
    }

    const placeId = response.data.results[0].place_id;
    const address = response.data.results[0].formatted_address;

    console.log(placeId, address);

    return {
        address,
        placeId
    }
}

module.exports = {
    getAddress
}
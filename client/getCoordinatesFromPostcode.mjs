import fetch from "node-fetch";

export async function getCoordinatesFromPostcode(postcode) {
    const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`
    let latitude;
    let longitude;
    await fetch(postcodeUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json()
        })
        .then(data => {
            latitude = data.result.latitude;
            longitude = data.result.longitude;
        })
    return({ latitude, longitude });
}
import * as readlineSync from "readline-sync";
import fetch from 'node-fetch';

let postcode = readlineSync.question('What is your postcode?');
const stopId = '490008660N';
let lat = '51.553935';
let long = '-0.144754';

const postcodeUrl = `https://api.postcodes.io/postcodes/${postcode}`
fetch(postcodeUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json()
    })
    .then(data => {
        let longitude = data.result.longitude;
        let latitude = data.result.latitude;
        console.log(longitude, latitude);
    })

const stopUrl = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanOnstreetBusCoachStopPair`
fetch(stopUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json()
    })
    .then(data => {
        let stopIds = [];
        const closestStopPoint = (data.stopPoints.sort((a, b) => (a.distance) - (b.distance))).splice(1, 1);
        const stopPair = closestStopPoint[0].children;
        stopPair.forEach((stop) => {
            stopIds.push(stop.naptanId);
        });
        console.log(stopIds);
    })

const url = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?api_id=ba9752d29aad406bbeb76a9fa432df18`;
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json()
    })
    .then(data => {
        data.sort((a, b) => (a.timeToStation) - (b.timeToStation));
        const nextFiveBuses = data.slice(0, 5);
        nextFiveBuses.forEach((bus) => {
            let minutes = Math.floor(bus.timeToStation / 60)
            console.log(`${bus.lineName} towards ${bus.destinationName} arriving in ${minutes} minutes`);
        });
        })
    .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        }
    );


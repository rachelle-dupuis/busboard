import * as readlineSync from "readline-sync";
import fetch from 'node-fetch';

const stopId = readlineSync.question('What is your stop code?');
console.log(stopId);

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
        })
;        })
    .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        }
    );


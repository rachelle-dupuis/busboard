import * as readlineSync from "readline-sync";
import {getCoordinatesFromPostcode} from "./client/getCoordinatesFromPostcode.mjs";
import {getStopCodesFromCoordinates} from "./client/getStopCodesFromCoordinates.mjs";
import {getNextArrivingBuses} from "./client/getNextArrivingBuses.mjs";

const postcode = readlineSync.question('What is your postcode?');
const coordinates = await getCoordinatesFromPostcode(postcode);
const latitude = coordinates.latitude;
const longitude = coordinates.longitude;

getStopCodesFromCoordinates(latitude, longitude).then(stops => {
    stops.forEach((stop) => {
        console.log(`The next buses arriving at ${stop.stopName} ${stop.stopIndicator} are:`);
        getNextArrivingBuses(stop.stopId).then(buses => {
            buses.forEach((bus) => {
                console.log(bus);
            })
        });
    })
});
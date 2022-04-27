import * as readlineSync from "readline-sync";
import {getCoordinatesFromPostcode} from "./client/getCoordinatesFromPostcode.mjs";
import {getStopCodesFromCoordinates} from "./client/getStopCodesFromCoordinates.mjs";
import {getNextArrivingBuses} from "./client/getNextArrivingBuses.mjs";

export function getBuses() {
    const postcode = readlineSync.question('What is your postcode?');
    getCoordinatesFromPostcode(postcode).then(coordinates => {
        getStopCodesFromCoordinates(coordinates.latitude, coordinates.longitude).then(stops => {
            stops.forEach((stop) => {
                getNextArrivingBuses(stop.stopId).then(buses => {
                    return buses;
                });
            })
        });
    })
}

getBuses();
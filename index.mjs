import * as readlineSync from "readline-sync";
import {getCoordinatesFromPostcode} from "./client/getCoordinatesFromPostcode.mjs";
import {getStopCodesFromCoordinates} from "./client/getStopCodesFromCoordinates.mjs";
import {getNextArrivingBuses} from "./client/getNextArrivingBuses.mjs";

export async function getBuses(postcode) {
    const coordinates = await getCoordinatesFromPostcode(postcode);
    const stops = await getStopCodesFromCoordinates(coordinates.latitude, coordinates.longitude);
    let allBuses = [];
    for (const stop of stops) {
        const buses = await getNextArrivingBuses(stop.stopId);
        allBuses.push({stopName: stop.stopName, stopNumber: stop.stopIndicator, buses: buses});
    }
    return allBuses;
}
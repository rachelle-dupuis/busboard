import * as readlineSync from "readline-sync";
import {getCoordinatesFromPostcode} from "./client/getCoordinatesFromPostcode.mjs";
import {getStopCodesFromCoordinates} from "./client/getStopCodesFromCoordinates.mjs";
import {getNextArrivingBuses} from "./client/getNextArrivingBuses.mjs";

export async function getBuses(postcode) {
    const coordinates = await getCoordinatesFromPostcode(postcode);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const stops = await getStopCodesFromCoordinates(latitude, longitude);
    let allBuses = [];
    for (const stop of stops) {
        const buses = await getNextArrivingBuses(stop.stopId);
        allBuses.push({stopName: stop.stopName, stopNumber: stop.stopIndicator, buses: buses});
    }
    return allBuses;
    // getCoordinatesFromPostcode(postcode).then(coordinates => {
    //     getStopCodesFromCoordinates(coordinates.latitude, coordinates.longitude).then(stops => {
    //         stops.forEach((stop) => {
    //             getNextArrivingBuses(stop.stopId).then(buses => {
    //                 return new Promise(res => {
    //                     console.log(buses);
    //                     res(buses);
    //                 });
    //             });
    //         })
    //     });
    // })
}

// const buses = await getBuses('SW112AJ');
// console.log(buses);
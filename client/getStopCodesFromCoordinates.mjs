import fetch from "node-fetch";

export async function getStopCodesFromCoordinates(lat, long) {
    const stopUrl = `https://api.tfl.gov.uk/StopPoint/?lat=${lat}&lon=${long}&stopTypes=NaptanOnstreetBusCoachStopPair`
    return await fetch(stopUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json()
        })
        .then(data => {
            const closestStopPoint = (data.stopPoints.sort((a, b) => (a.distance) - (b.distance))).splice(0, 1);
            const stopPair = closestStopPoint[0].children;
            return stopPair.map((stop) => {
                return {stopId: stop.naptanId, stopName: stop.commonName, stopIndicator: stop.indicator};
            });
        })
}


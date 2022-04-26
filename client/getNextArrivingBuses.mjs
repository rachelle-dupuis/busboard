import fetch from "node-fetch";

export async function getNextArrivingBuses(stopId) {
    const url = `https://api.tfl.gov.uk/StopPoint/${stopId}/Arrivals?api_id=ba9752d29aad406bbeb76a9fa432df18`;
    let nextBuses = [];
    await fetch(url)
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
                nextBuses.push(`${bus.lineName} towards ${bus.destinationName} arriving in ${minutes} minutes`);
            });
        })
        .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            }
        );
    return nextBuses;
}
function getBusesByPostcode(postcode){
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', 'http://localhost:3000/departureBoards/' + postcode, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function() {
        var stops = JSON.parse(this.response);
        let text = "<ul>"
        for (const stop of stops) {
            let buses = stop.buses;
            text += "The next buses arriving at " + stop.stopName + stop.stopNumber;
            for (const bus of buses) {
                text += "<li>"
                text += bus.line + " heading towards " + bus.destination + " arriving in " + bus.time + " minutes" + "</li>"
            }
        }
        text += "</ul>"
        document.getElementById("results").innerHTML = text;
    }
    xhttp.send();
}

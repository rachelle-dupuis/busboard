var xhttp = new XMLHttpRequest();

xhttp.open('GET', 'http://localhost:3000/departureBoards/nw51tl', true);

xhttp.setRequestHeader('Content-Type', 'application/json');

xhttp.onload = function() {
    // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
    document.getElementById("results").innerHTML = this.responseText;
}

xhttp.send();

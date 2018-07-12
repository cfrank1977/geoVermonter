let vermontBoarder = L.geoJSON(border_data)
let randLon
let randLat
let point

function initialize() {

    map = L.map('mapid').setView([43.942425, -72.698704], 7);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiY2ZyYW5rIiwiYSI6ImNqamVxdHdkdDFlZTIzcG9sY3B4N3BjdTQifQ.rLOdddfG8A4S-BWgcXj8dA'
    }).addTo(map);

    // create a red polygon from an array of LatLng points

    vermontBoarder.addTo(map)

    let startButton = document.getElementById('start')
    //   startButton.addEventListener('click', () => {
    //     start()
    //   })
}

function start() {
    console.log('start')
    getRandomLatLonInVT()
}

function guess() {
    console.log('geuss')
}

function quit() {
    document.getElementById('lat').value = randLat
    document.getElementById('lon').value = randLon
    getAddressFromLatLon()
    console.log('quit')
}

function getRandomLatLonInVT() {

    let boundingBox = {
        maxLon: -73.3654,
        minLon: -71.5489,
        maxLat: 45.0065,
        minLat: 42.7395
    };

    let bb = boundingBox;
    randLat = getRandomCoords(bb.minLat, bb.maxLat)
    randLon = getRandomCoords(bb.minLon, bb.maxLon)
    console.log(randLat, randLon)
    L.marker([randLat, randLon]).addTo(map);
    point = { lat: randLat, lon: randLon }
    let inVermont = leafletPip.pointInLayer([randLon, randLat], vermontBoarder);

    if (inVermont.length == 0) {
        getRandomLatLonInVT()
    }
    else {
        map.setView([point.lat, point.lon], 18);
        document.getElementById('lat').value = "?"
        document.getElementById('lon').value = "?"
        document.getElementById('county').value = "?"
        document.getElementById('town').value = "?"
        console.log(`Length of results: ${inVermont.length}`)
        console.log({ inVermont })
        console.log({ point })
    }

}


function getRandomCoords(min, max) {
    return Math.random() * (max - min) + min;
}

function getAddressFromLatLon() {

    baseMapURL = "https://nominatim.openstreetmap.org/reverse.php?format=html&lat=";
    formatJson = '&format=json'
    addressURL = `${baseMapURL}${randLat}&lon=${randLon}&zoom=18&${formatJson}`
    console.log(addressURL)
    fetch(addressURL)
        .then(function (result) {
            return result.json()
        })
        .then(function (theResult) {
            console.log(theResult)
            showCountyAndVillage(theResult)
        })
}

function moveNorth() {
    let newlatnorth = point.lat + 0.0050
    point.lat = newlatnorth
    console.log(newlatnorth)
    map.setView([newlatnorth, point.lon], 18);
}
function moveEast() {
    let newloneast = point.lon + 0.0050
    point.lon = newloneast
    console.log(newloneast)
    map.setView([point.lat, newloneast], 18)
}
function moveWest() {
    let newlonwest = point.lon - 0.0050
    point.lon = newlonwest
    console.log(newlonwest)
    map.setView([point.lat, newlonwest], 18)
}
function moveSouth() {
    newlatsouth = point.lat - 0.0050
    point.lat = newlatsouth
    console.log(newlatsouth)
    map.setView([newlatsouth, point.lon], 18)
}


function showCountyAndVillage(theResult) {
    document.getElementById('county').value = theResult.address.county
    document.getElementById('town').value = theResult.address.road
}

initialize();


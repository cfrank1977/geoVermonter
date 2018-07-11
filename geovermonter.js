let vermontBoarder = L.geoJSON(border_data)

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
    let randLat = getRandomCoords(bb.minLat, bb.maxLat)
    let randLon = getRandomCoords(bb.minLon, bb.maxLon)

       

    let point = {lat: randLat, lon: randLon}
    let inVermont = leafletPip.pointInLayer([randLon, randLat], vermontBoarder);

    if (inVermont.length == 0) {
        getRandomLatLonInVT()
       }
    else {
        console.log(`Length of results: ${inVermont.length}`)
        console.log({inVermont})
        console.log({point})
    }
    
}


function getRandomCoords(min, max) {
    return Math.random() * (max - min) + min;
}

initialize();
let vermontBoarder = L.geoJSON(border_data)
let randLon
let randLat
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

       

    let point = {lat: randLat, lon: randLon}
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
        console.log({inVermont})
        console.log({point})
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
    document.getElementById('county').value = addressURL.address.county
    document.getElementById('town').value = "?"
}

initialize();



{"place_id":"213562846","licence":"Data © OpenStreetMap contributors, ODbL 1.0. https:\/\/osm.org\/copyright","osm_type":"way","osm_id":"19684921",
"lat":"42.7629925664301","lon":"-72.9443993906264","display_name":"592, Tunnel Street, Whitingham, Bennington County, Vermont, 05350, United 
States of America","address":{"house_number":"592","road":"Tunnel Street","village":"Whitingham","county":"Bennington County","state":"Vermont","postcode":"05350","country":"United States of America","country_code":"us"},"boundingbox":["42.76289256643","42.76309256643","-72.944499390626","-72.944299390626"]}
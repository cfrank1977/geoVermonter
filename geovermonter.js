let vermontBoarder = L.geoJSON(border_data)
// let countyData = L.geoJSON(county_data, {color: 'black'})
let randLon
let randLat
let point
let value
let countyDetailsJson
let map
let original

function initialize() {
    document.getElementById('north').disabled = true
    document.getElementById('east').disabled = true
    document.getElementById('west').disabled = true
    document.getElementById('south').disabled = true

    map = L.map('mapid').setView([43.942425, -72.698704], 7);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiY2ZyYW5rIiwiYSI6ImNqamVxdHdkdDFlZTIzcG9sY3B4N3BjdTQifQ.rLOdddfG8A4S-BWgcXj8dA'
    }).addTo(map);
    $("#mapid").height($(parent).height()).width($(parent).width());
    map.invalidateSize();
    vermontBoarder.addTo(map)
    // countyData.addTo(map)
    
}

function start() {
    document.getElementById('messagebox').textContent = 'What county are we in?'
    document.getElementById('north').disabled = false
    document.getElementById('east').disabled = false
    document.getElementById('west').disabled = false
    document.getElementById('south').disabled = false
    getRandomLatLonInVT()
    getAddressFromLatLon()
    console.log(original)
    console.log(point)
    map.dragging.disable();
    map.touchZoom.disable();
    map.removeControl( map.zoomControl );
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
}

function quit() {
    document.getElementById('lat').value = randLat
    document.getElementById('lon').value = randLon
    getAddressFromLatLon()
    console.log('quit')
    value = 20
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

    original = { lat: randLat, lon: randLon }
    point = { lat: randLat, lon: randLon }
    let inVermont = leafletPip.pointInLayer([randLon, randLat], vermontBoarder);
    if (inVermont.length == 0) {
        getRandomLatLonInVT()
    }
    else {
        map.setView([point.lat, point.lon], 18);
        L.marker([randLat, randLon]).addTo(map);
        document.getElementById('lat').value = "?"
        document.getElementById('lon').value = "?"
        populateCountyDropdown()
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

            setCountyJSONGlobal(theResult)


        })
}

function moveNorth() {
    value = document.getElementById('score').value
    value--
    document.getElementById('score').value = value
    if (value == 0) {
        document.getElementById('north').disabled = true
        document.getElementById('east').disabled = true
        document.getElementById('west').disabled = true
        document.getElementById('south').disabled = true
    }
    let newlatnorth = point.lat + 0.0050
    point.lat = newlatnorth
    console.log(newlatnorth)
    map.setView([newlatnorth, point.lon], 18);
}
function moveEast() {
    value = document.getElementById('score').value
    value--
    document.getElementById('score').value = value
    if (value == 0) {
        document.getElementById('north').disabled = true
        document.getElementById('east').disabled = true
        document.getElementById('west').disabled = true
        document.getElementById('south').disabled = true
    }
    let newloneast = point.lon + 0.0050
    point.lon = newloneast
    console.log(newloneast)
    map.setView([point.lat, newloneast], 18)
}
function moveWest() {
    value = document.getElementById('score').value
    value--
    document.getElementById('score').value = value
    if (value == 0) {
        document.getElementById('north').disabled = true
        document.getElementById('east').disabled = true
        document.getElementById('west').disabled = true
        document.getElementById('south').disabled = true
    }
    let newlonwest = point.lon - 0.0050
    point.lon = newlonwest
    console.log(newlonwest)
    map.setView([point.lat, newlonwest], 18)
}
function moveSouth() {
    value = document.getElementById('score').value
    value--
    document.getElementById('score').value = value
    if (value == 0) {
        document.getElementById('north').disabled = true
        document.getElementById('east').disabled = true
        document.getElementById('west').disabled = true
        document.getElementById('south').disabled = true
    }
    newlatsouth = point.lat - 0.0050
    point.lat = newlatsouth
    console.log(newlatsouth)
    map.setView([newlatsouth, point.lon], 18)
}

function goBackToOriginal() {
    map.setView([original.lat, original.lon], 18)
}


function setCountyJSONGlobal(theResult) {
    countyDetailsJson = theResult.address.county
}

/*
* Function populates Nav Bar dropdown list and adds event listener to each item
* for on click to call get the restaurant details from its json file.
*/
function populateCountyDropdown() {
    countyVTList = ['Addison County', 'Bennington County', 'Caledonia County', 'Chittenden County', 'Essex County', 'Franklin County', 'Grand isle County', 'Lamoille County', 'Orange County', 'Orleans County', 'Rutland County', 'Washington County', 'Windham County', 'Windsor County']
    for (countyVT of countyVTList) {
        let currentCounty = countyVT;
        $('<a id="' + countyVT + '" class="dropdown-item" href="#">' + countyVT + '</a>').appendTo('#dynamicCountyList');
        let countyLing = document.getElementById(currentCounty)

        countyLing.addEventListener('click', () => {
            console.log({ currentCounty })
            console.log({ countyDetailsJson })
            value = document.getElementById('score').value
            value--
            document.getElementById('score').value = value
            if (currentCounty.toString() === countyDetailsJson) {
                console.log('itworks')
                alert("GOOD JOB! YOU GOT THE COUNTY CORRECT!")
            }

        })
    }
    
}

initialize();


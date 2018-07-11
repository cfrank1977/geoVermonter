

function initialize(border) {

    map = L.map('mapid').setView([43.942425, -72.698704], 7);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiY2ZyYW5rIiwiYSI6ImNqamVxdHdkdDFlZTIzcG9sY3B4N3BjdTQifQ.rLOdddfG8A4S-BWgcXj8dA'
    }).addTo(map);

    let polydata = border.geometry.coordinates[0]

    let fixedpolydata = polydata.map((elem) => {

        let fixedcoords = [elem[1], elem[0]]
        return fixedcoords

    })
    

    // create a red polygon from an array of LatLng points
console.log(fixedpolydata)
    var polygon = L.polygon(fixedpolydata, {color: 'red'}).addTo(map);
    // zoom the map to the polygon
    map.fitBounds(polygon.getBounds());         
}
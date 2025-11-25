const osloCoordinates = { 
    lat: 59.9139, 
    lng: 10.7522 }; // Oslo, Norway;
    const osloZoom = 7;


var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView(osloCoordinates, osloZoom); // Oslo, Norway 

// Add zoom control to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add openstreetmap layer
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
mapLayer.addTo(map);

// 

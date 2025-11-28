const moldeCoordinates = {
    lat: 62.73547927593037, 
    lng: 7.156011858986631
};
const moldeZoom = 9;

const norwayCoordinates = {
    lat: 64.5,
    lng: 12.0
};

const toggleIndicatorClass = "bg-[#05ce00]";


var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView(moldeCoordinates, moldeZoom); // Molde, Norway 

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



const moldeLayer = L.layerGroup()
// Heart Polygon
const heartPolygon = L.polygon([
    [62.65, 7.2],
    [62.75, 7.375],
    [62.81, 7.4],
    [62.85, 7.33],
    [62.85, 7.26],
    [62.82, 7.2],
    [62.85, 7.14],
    [62.85, 7.07],
    [62.81, 7.0],
    [62.75, 7.025],
], {
    color: '#FF0000',
    weight: 2,
    opacity: 0.8,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
}).addTo(moldeLayer);

heartPolygon.bindPopup('Molde is the town I grew up in, and currently work.', {
    closeButton: false,
});

// Arrow
const arrowPolygon = L.polyline([
    [62.90, 7.51],
    [62.7492, 7.194],
    [62.77, 7.194],
    [62.7492, 7.194],
    [62.7492, 7.235]
], {
    color: '#000000',
    opacity: 0.8,
    weight: 3,
}).addTo(moldeLayer);

// Circle
const circle = L.circle([62.90265148318389, 7.6641673690567425], {
    color: '#ae00ff',
    fillColor: '#ae00ff',
    fillOpacity: 0.5,
    radius: 1000
}).addTo(moldeLayer);

circle.bindPopup('This is where I live, in Norway.', {
    closeButton: false,
});

const moldeButton = document.getElementById('toggle_molde');
moldeButton.addEventListener('click', () => {
    if (map.hasLayer(moldeLayer)) {
        map.removeLayer(moldeLayer);
        moldeButton.querySelector('[data-indicator]').classList.remove(toggleIndicatorClass);
    } else {
        map.addLayer(moldeLayer);
        moldeButton.querySelector('[data-indicator]').classList.add(toggleIndicatorClass);
        map.setView(moldeCoordinates, moldeZoom);
    }
});
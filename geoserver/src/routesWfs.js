import L, { point } from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-wfst';

const toggleIndicatorClass = "bg-[#05ce00]";
const gradeColors = [
    "#c0c0c0", // Very Easy
    "#00984A", // Easy
    "#0A66B1", // Medium
    "#DE0832", // Hard
    "#000000", // Very Hard
];
var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView([62.7, 7.0], 9); // Centered on Møre og Romsdal, Norway

// Add zoom control to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add openstreetmap layer
const mapLayer = L.tileLayer.wms('https://cache.kartverket.no/v1/wms?', { // https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml
    layers: ['topo'],
    format: "image/png",
    attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
});
mapLayer.addTo(map);

// WFS layer for route points
const pointFilter = new L.Filter.EQ('type', '0'); // Hiking points
var pointLayer = new L.WFST({
    url: 'https://geoserver.haxor.no/geoserver/wfs',
    typeNS: 'usw',
    typeName: 'morotur_route_points',
    crs: L.CRS.EPSG4326,
    geometryField: 'geom',
    showExisting: true,
    maxFeatures:  500,
    filter: pointFilter.toGml()


}, new L.Format.GeoJSON({
    pointToLayer: (geoJsonPoint, latlng) => {
        const grade = geoJsonPoint.properties.grade;
        const icon = L.icon({ 
            iconUrl: "/resources/icons/hikingMarker" + (parseInt(grade) + 1) + ".svg", 
            iconSize: [21.3, 24.6],
            iconAnchor: [10.65, 24.6],
            popupAnchor: [0, -24.6],
        });
        return L.marker(latlng, { icon });
    }
}));
pointLayer.addTo(map);

// add popup on each feature
pointLayer.on('click', function(event) {
    const props = event.sourceTarget.feature.properties;
    const popupContent = `
        <b class="text-base">${props.name}</b><br/>
        <b>Type:</b> ${props.type === 0 ? 'Hiking' : props.type === 1 ? 'Skiing' : props.type === 2 ? 'Biking' : 'Kayaking'}<br/>
        <b>Grade:</b> ${props.grade == -1 ? 'Very Easy' : props.grade === 0 ? 'Easy' : props.grade === 1 ? 'Medium' : props.grade === 2 ? 'Hard' : 'Very Hard'}<br/>
        <br/>
        <a href="${props.url}" target="_blank">Read more</a>
    `;
    event.layer.bindPopup(popupContent, { closeButton: false }).openPopup();
});


// WFS layer for route tracks
const routeFilter = new L.Filter.EQ('route_id', '0'); // Hiking routes
var routeLayer = new L.WFST({
    url: 'https://geoserver.haxor.no/geoserver/wfs',
    typeNS: 'usw',
    typeName: 'morotur_route_tracks',
    crs: L.CRS.EPSG4326,
    geometryField: 'geom',
    showExisting: true,
    maxFeatures:  1,                                        
    filter: routeFilter.toGml(),
    style: {
        color: "#000000",
        weight: 3,
        opacity: 0.7,
    }
});
routeLayer.addTo(map);

pointLayer.on('mouseover', function(event) {
    routeLayer.clearLayers();
    const routeId = event.sourceTarget.feature.properties.route_id;
    const filter = new L.Filter.EQ('route_id', routeId);
    routeLayer.options.style.color = gradeColors[event.sourceTarget.feature.properties.grade + 1];
    routeLayer.loadFeatures(filter.toGml());
});


// Buttons to toggle route types
const hikingButton = document.getElementById("toggle_hiking");
const skiingButton = document.getElementById("toggle_skiing");
const bikingButton = document.getElementById("toggle_biking");
const kayakingButton = document.getElementById("toggle_kayaking");

hikingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', 0);
    pointLayer.loadFeatures(filter.toGml());
});

skiingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', 1);
    pointLayer.loadFeatures(null, filter.toGml());
});

bikingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', 2);
    pointLayer.loadFeatures(filter.toGml());
});

kayakingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', 3);
    pointLayer.loadFeatures(filter.toGml());
});
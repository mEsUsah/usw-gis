import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-wfst';
const toggleIndicatorClass = "bg-[#05ce00]";
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


// WFS layer from GeoServer
var filter = new L.Filter.EQ('type', '0'); // Hiking points

var pointLayer = new L.WFS({
    url: 'https://geoserver.haxor.no/geoserver/ows',
    typeNS: 'usw',
    typeName: 'morotur_route_points',
    crs: L.CRS.EPSG4326,
    geometryField: 'geom',
    showExisting: true,                                       // load & show features on init
    maxFeatures:  500,                                        // safety limit
    filter: filter.toGml()


}, new L.Format.GeoJSON({
    pointToLayer: (feature, latlng) => {
        const grade = feature.properties.grade;
        const icon = L.icon({ 
            iconUrl: "/resources/icons/hikingMarker" + (parseInt(grade) + 1) + ".svg", 
            iconSize: [32, 37],
            iconAnchor: [16, 37],
            popupAnchor: [0, -37],
        });
        return L.marker(latlng, { icon });
    },
}));
pointLayer.addTo(map);


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
    const filter = new L.Filter.EQ('type', '0'); // Hiking points
    pointLayer.loadFeatures(filter.toGml());
});

skiingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', '1'); // Skiing points
    pointLayer.loadFeatures(null, filter.toGml());
});

bikingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', '2'); // Biking points
    pointLayer.loadFeatures(filter.toGml());
});

kayakingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    pointLayer.clearLayers();
    const filter = new L.Filter.EQ('type', '3'); // Kayaking points
    pointLayer.loadFeatures(filter.toGml());
});
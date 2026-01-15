const toggleIndicatorClass = "bg-[#05ce00]";

var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView([54.0, -3.0], 6); // Centered on UK

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


// WMS layer from GeoServer
const wmsLayer = L.tileLayer.wms('https://geoserver.haxor.no/geoserver/wms', {
    layers: 'usw:uk_coal',
    format: 'image/png',
    transparent: true,
    opacity: 0.7
});
wmsLayer.addTo(map);

const legendUrl = "https://geoserver.haxor.no/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usw%3Auk_coal";
L.wmsLegend(legendUrl);

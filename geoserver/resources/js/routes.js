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


// WMS layer from GeoServer
const wmsLayer = L.tileLayer.wms('https://geoserver.haxor.no/geoserver/wms', {
    layers: 'usw:morotur_routes',
    format: 'image/png',
    attribution: '<a href="https://morotur.no/">Morotur.no</a>',
    transparent: true,
    opacity: 0.9
});
wmsLayer.setParams({cql_filter: "turtype='Fottur'"});
wmsLayer.addTo(map);

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
    wmsLayer.setParams({cql_filter: "turtype='Fottur'"});
});

skiingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    wmsLayer.setParams({cql_filter: "turtype='Skitur'"});
});

bikingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    wmsLayer.setParams({cql_filter: "turtype='Sykkeltur'"});
});

kayakingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    wmsLayer.setParams({cql_filter: "turtype='Padletur'"});
});

const legendUrl = "https://geoserver.haxor.no/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usw%3Amorotur_routes";
L.wmsLegend(legendUrl);

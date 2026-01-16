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


// WMS route layer from GeoServer
const wmsRouteTrackLayer = L.tileLayer.wms('https://geoserver.haxor.no/geoserver/wms', {
    layers: 'usw:morotur_route_tracks',
    format: 'image/png',
    attribution: '<a href="https://morotur.no/">Morotur.no</a>',
    transparent: true,
    opacity: 0.9
});
wmsRouteTrackLayer.setParams({cql_filter: "turtype='Fottur'"});
wmsRouteTrackLayer.addTo(map);

// WMS route point layer from GeoServer
const wmsRoutePointLayer = L.tileLayer.wms('https://geoserver.haxor.no/geoserver/wms', {
    layers: 'usw:morotur_route_points',
    format: 'image/png',
    attribution: '<a href="https://morotur.no/">Morotur.no</a>',
    transparent: true,
    opacity: 0.9
});
wmsRoutePointLayer.setParams({cql_filter: "type='0'"});
wmsRoutePointLayer.addTo(map);

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
    wmsRouteTrackLayer.setParams({cql_filter: "turtype='Fottur'"});
    wmsRoutePointLayer.setParams({cql_filter: "type='0'"});
});

skiingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    wmsRouteTrackLayer.setParams({cql_filter: "turtype='Skitur'"});
    wmsRoutePointLayer.setParams({cql_filter: "type='1'"});
});

bikingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    wmsRouteTrackLayer.setParams({cql_filter: "turtype='Sykkeltur'"});
    wmsRoutePointLayer.setParams({cql_filter: "type='2'"});
});

kayakingButton.addEventListener("click", () => {
    hikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    skiingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    bikingButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    kayakingButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    wmsRouteTrackLayer.setParams({cql_filter: "turtype='Padletur'"});
    wmsRoutePointLayer.setParams({cql_filter: "type='3'"});
});

const legendUrl = "https://geoserver.haxor.no/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usw%3Amorotur_route_tracks&style=morotur_grade";
L.wmsLegend(legendUrl);

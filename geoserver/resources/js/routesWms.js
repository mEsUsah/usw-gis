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
const toggleButtons = document.querySelectorAll("[data-route-type]");
toggleButtons.forEach(button => {
    button.addEventListener("click", () => {
        const routeType = button.getAttribute("data-route-type");
        
        // Set toggle indicator
        toggleButtons.forEach(btn => {
            btn.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
            if(btn === button) {
                btn.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
            }
        });

        // Load features with filter
        wmsRoutePointLayer.setParams({cql_filter: `type='${routeType}'`}); 
        let turtype = '';
        switch(routeType) {
            case '0':
                turtype = 'Fottur';
                break;
            case '1':
                turtype = 'Skitur';
                break;
            case '2':
                turtype = 'Sykkeltur';
                break;
            case '3':
                turtype = 'Padletur';
                break;
        }
        wmsRouteTrackLayer.setParams({cql_filter: `turtype='${turtype}'`});
    });
});

// Add WMS legend
const legendUrl = "https://geoserver.haxor.no/geoserver/ows?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=usw%3Amorotur_route_points";
L.wmsLegend(legendUrl);

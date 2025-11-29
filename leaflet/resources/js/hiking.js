const moldeCoordinates = {
        lat: 62.76, 
        lng: 7.156
    };
    const moldeZoom = 12;


var map = L.map('map_space', {
    'zoomControl': false,
})
// Set initial view to Molde, Norway
map.setView(moldeCoordinates, moldeZoom);

// Add geolet control (shows user's current location)
L.geolet({ position: 'bottomright' }).addTo(map);

// Add zoom control to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);


const mapLayers = [
    {
        'layer': L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),
        'name': 'OpenStreetMap'
    },
    {
        'layer': L.tileLayer.wms('https://cache.kartverket.no/v1/wms?', { // https://cache.kartverket.no/v1/wmts/1.0.0/WMTSCapabilities.xml
            layers: ['topo'],
            format: "image/png",
            attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>',
        }), 
        'name': 'Topographic Map (Hiking map)'
    }
];

const mapOverlays = [
    {
        'layer': L.tileLayer.wms("https://nve.geodataonline.no:443/arcgis/services/Bre2/MapServer/WmsServer?", { //https://nve.geodataonline.no/arcgis/services/Bre2/MapServer/WmsServer?request=GetCapabilities&service=WMS
            layers: ["Bre"], 
            opacity: 0.7, 
            transparent: !0, 
            format: "image/png", 
            attribution: '&copy; <a href="https://www.nve.no/">NVE</a>' 
        }),
        'name': 'Glaciers'
    },
    {
        'layer': L.tileLayer.wms("https://nve.geodataonline.no/arcgis/services/Bratthet/MapServer/WmsServer?", { //https://nve.geodataonline.no/arcgis/services/Bratthet/MapServer/WMSServer?request=GetCapabilities&service=WMS
            layers: ["Bratthet_snoskred"], 
            opacity: 0.3, 
            transparent: !0, 
            format: "image/png", 
            attribution: '&copy; <a href="https://www.nve.no/">NVE</a>' 
        }),
        'name': 'Avalanche Risk'
    },
    {
        'layer': L.tileLayer.wms("https://wms.geonorge.no/skwms1/wms.friluftsruter2?", { // https://wms.geonorge.no/skwms1/wms.friluftsruter2?request=GetCapabilities&service=WMS&version=1.3.0
            layers: ["Fotrute_gradering"],
            opacity: 1,
            transparent: !0,
            format: "image/png",
            attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>'
        }),
        'name': 'Hiking Trails, Graded'
    },
    {
        'layer': L.tileLayer.wms("https://wms.geonorge.no/skwms1/wms.friluftsruter2?", { // https://wms.geonorge.no/skwms1/wms.friluftsruter2?request=GetCapabilities&service=WMS&version=1.3.0
            layers: ["Skiloype_gradering"],
            opacity: 1,
            transparent: !0,
            format: "image/png",
            attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>'
        }),
        'name': 'Ski tours, Graded'
    },
    {
        'layer': L.tileLayer.wms("https://wms.geonorge.no/skwms1/wms.friluftsruter2?", { // https://wms.geonorge.no/skwms1/wms.friluftsruter2?request=GetCapabilities&service=WMS&version=1.3.0
            layers: ["Upreparert"],
            opacity: 1,
            transparent: !0,
            format: "image/png",
            attribution: '&copy; <a href="https://www.kartverket.no/">Kartverket</a>'
        }),
        'name': 'Ski tour (unprepared)'
    },
];

// Use Topographic Map (Hiking map) by default
mapLayers.find(layerObj => layerObj.name === 'Topographic Map (Hiking map)').layer.addTo(map);

// Add the built-in layer control
const layerControl = L.control.layers();
layerControl.addTo(map);

// Add layers
mapLayers.forEach((layerObj) => {
    layerControl.addBaseLayer(layerObj.layer, layerObj.name);
});

// Add overlays
mapOverlays.forEach((overlayObj) => {
    layerControl.addOverlay(overlayObj.layer, overlayObj.name);
});

// GeoJSON hiking route: Frænavarden, Molde, Møre og Romsdal, Norway
const geoJSONroute = fetch('/leaflet/resources/geodata/franavarden.geojson') // https://morotur.no/tur/fraenavarden
    .then(response => response.json())
    .then(data => {
        const routeLayer = L.geoJSON(data, {
            style: {
                color: 'blue',
                weight: 2,
                opacity: 0.7
            },
            attribution: '<a href="https://morotur.no/">Morotur.no</a>'
        });
        layerControl.addOverlay(routeLayer, 'Hiking Route: Frænavarden');
        routeLayer.addTo(map); // Preselect the route layer
    });


// Add points from morotur
const poiLayer = L.layerGroup();
layerControl.addOverlay(poiLayer, 'Shelters and open cabins');
const pois = fetch('/leaflet/resources/geodata/poi.json')
    .then(response => response.json())
    .then(data => {
        data.poi.forEach((poi) => {
            const marker = L.marker([poi.lat, poi.lng],{
                icon: L.icon({
                    iconUrl: `/resources/icons/hikingMarker.svg#${poi.type}`,
                    iconSize: [32, 37],
                    iconAnchor: [16, 37],
                    popupAnchor: [0, -37],
                })
            });
            marker.bindPopup(`<b>${poi.name}</b><br>${poi.desc}`);
            poiLayer.addLayer(marker);
            poiLayer.addTo(map); // Preselect the POI layer
        });
    });
        
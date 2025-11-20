const moldeCoordinates = {
        lat: 62.73547927593037, 
        lng: 7.156011858986631
    };
    const moldeZoom = 11;


var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView(moldeCoordinates, moldeZoom); // Molde, Norway

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
        'name': 'Ski tour, unprepared'
    }
];

// Use openstreetmap by default
mapLayers.find(layerObj => layerObj.name === 'OpenStreetMap').layer.addTo(map);


const layerControl = L.control.layers();
layerControl.addTo(map);

// Add layers to layer control
mapLayers.forEach((layerObj) => {
    layerControl.addBaseLayer(layerObj.layer, layerObj.name);
});

// Add overlays to layer control
mapOverlays.forEach((overlayObj) => {
    layerControl.addOverlay(overlayObj.layer, overlayObj.name);
});

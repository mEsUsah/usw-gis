const buttonWrapper = new OlButtonWrapper();

// Initialize map
map = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.fromLonLat
        center: ol.proj.fromLonLat([10.7522, 59.9139], 'EPSG:3857'), // Oslo, Norway, Google maps CRS
        zoom: 7
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            zIndex: 1,
        })
    ],
    target: 'map_space',
    controls: ol.control.defaults().extend([
        new ol.control.Control({
            element: buttonWrapper.element()
        }),
        new ol.control.ScaleLine({
            units: 'metric',
            bar: true,
            // steps: 4,
            text: true,
            minWidth: 140
        })
    ])
});

// GeoJSON overlay - countries outline
var geoJSONLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: 'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson'
    }),
    zIndex: 3,
    opacity: 0.5,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 1
        })
    })
});

// GeoJSON overlay toggle button
const geoJSONLayerButton = new OlButton('Countries outline');
geoJSONLayerButton.element().addEventListener('click', function() {
    if (geoJSONLayerButton.isActive) {
        map.removeLayer(geoJSONLayer);
        geoJSONLayerButton.off();
    } else {
        map.addLayer(geoJSONLayer);
        geoJSONLayerButton.on();
        map.getView().setCenter(ol.proj.fromLonLat([26.7188, 57.5158], 'EPSG:3857')); // Center map to Africa/Europe
        map.getView().setZoom(3);
    }
});
buttonWrapper.addButton(geoJSONLayerButton.element());

// WMS overlay - USA States
var wmsLayer = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        url: 'https://ahocevar.com/geoserver/wms',
        params: {
            'LAYERS': 'topp:states'
        },
    }),
    zIndex: 2,
    opacity: 0.5,
});

// WMS layer toggle button
const wmsLayerButton = new OlButton('USA States');
wmsLayerButton.element().addEventListener('click', function() {
    if (wmsLayerButton.isActive) {
        map.removeLayer(wmsLayer);
        wmsLayerButton.off();
    } else {
        map.addLayer(wmsLayer);
        wmsLayerButton.on();
        map.getView().setCenter(ol.proj.fromLonLat([-97.2654, 38.8593], 'EPSG:3857')); // Center map to USA
        map.getView().setZoom(4);
    }
});
buttonWrapper.addButton(wmsLayerButton.element());


// British National Grid overlay
proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
    '+x_0=400000 +y_0=-100000 +ellps=airy ' +
    '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
    '+units=m +no_defs');
var imageExtent = [0, 0, 700000, 1300000];

var bngLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/British_National_Grid.svg/2000px-British_National_Grid.svg.png',
        projection: 'EPSG:27700',
        imageExtent: imageExtent
    }),
    zIndex: 4,
    opacity: 0.5,
});

const bngLayerButton = new OlButton('British National Grid');
bngLayerButton.element().addEventListener('click', function() {
    if (bngLayerButton.isActive) {
        map.removeLayer(bngLayer);
        bngLayerButton.off();
    } else {
        map.addLayer(bngLayer);
        bngLayerButton.on();
        map.getView().setCenter(ol.proj.fromLonLat([-3.0542, 56.0229], 'EPSG:3857')); // Center map to British National Grid
        map.getView().setZoom(5);
    }
});
buttonWrapper.addButton(bngLayerButton.element());


// Norway border GeoJSON overlay (same as in Google Maps example)
var norwayGeoJSONLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: '/googleMapsApi/resources/geodata/norway.geojson'
    }),
    zIndex: 5,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#a454ffff',
            width: 2
        }),
    })
});

const norwayLayerButton = new OlButton('Norway outline');
norwayLayerButton.element().addEventListener('click', function() {
    if (norwayLayerButton.isActive) {
        map.removeLayer(norwayGeoJSONLayer);
        norwayLayerButton.off();
    } else {
        map.addLayer(norwayGeoJSONLayer);
        norwayLayerButton.on();
        map.getView().setCenter(ol.proj.fromLonLat([16.0522, 65.9389], 'EPSG:3857')); // Center map to Norway
        map.getView().setZoom(4);
    }
});
buttonWrapper.addButton(norwayLayerButton.element());


// Heatmap overlay - Earthquakes
var eatthquakeHeatmapLayer = new ol.layer.Heatmap({
    title: 'Earthquakes heatmap',
    source: new ol.source.Vector({
        url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012_Earthquakes_Mag5.kml',
        format: new ol.format.KML({
            extractStyles: false
        })
    }),
    blur: 15,
    radius: 5,
    zIndex: 2,
    name: "heatmapLayer"
});

const heatmapLayerButton = new OlButton('Earthquakes');
heatmapLayerButton.element().addEventListener('click', function() {
    if (heatmapLayerButton.isActive) {
        map.removeLayer(eatthquakeHeatmapLayer);
        heatmapLayerButton.off();
    } else {
        map.addLayer(eatthquakeHeatmapLayer);
        heatmapLayerButton.on();
        map.getView().setCenter(ol.proj.fromLonLat([121.7285, 5.7909], 'EPSG:3857')); // Center map to Borneo
        map.getView().setZoom(4);
    }
});
buttonWrapper.addButton(heatmapLayerButton.element());


const moveToMoscowButton = new OlButton('Moscow');
moveToMoscowButton.element().addEventListener('click', function() {
    map.getView().animate({
        center: ol.proj.fromLonLat([37.6173, 55.7558], 'EPSG:3857'), // Moscow
        zoom: 9,
        duration: 2000
    });
});
buttonWrapper.addButton(moveToMoscowButton.element());
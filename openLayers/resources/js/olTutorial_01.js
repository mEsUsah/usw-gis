
map1 = new ol.Map({
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
    target: 'map_space'
});

// WMS overlay
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
map1.addLayer(wmsLayer);

// GeoJSON overlay
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
map1.addLayer(geoJSONLayer);

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
})
map1.addLayer(bngLayer);
const buttonWrapper = new OlButtonWrapper();

const moldeCoordinates = {
    lat: 62.73547927593037, 
    lng: 7.156011858986631
};

// Initialize map
map = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.fromLonLat
        center: ol.proj.fromLonLat([moldeCoordinates.lng, moldeCoordinates.lat], 'EPSG:3857'), // Molde, Norway, Google maps CRS
        zoom: 9
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
            text: true,
            minWidth: 140
        })
    ])
});

// Draw a heart-shaped polygon around Molde
const polygonHeartCoordinates = [
   [ 7.2, 62.65],
   [7.375, 62.75],
   [7.4, 62.81],
   [7.33, 62.85],
   [7.26, 62.85],
   [7.2, 62.82],
   [7.14, 62.85],
   [7.07, 62.85],
   [7.0, 62.81],
   [7.025, 62.75],
];

// Convert coordinates from google maps (EPSG:4326) to the map's projection (EPSG:3857)
var polygonHeart = new ol.geom.Polygon([polygonHeartCoordinates]).transform('EPSG:4326', 'EPSG:3857');

// Create a feature using the geometry
var polygonHeartFeature = new ol.Feature({
    geometry: polygonHeart,
    name: 'Heart'
});

// Add some styling to the heart polygon
polygonHeartFeature.setStyle(new ol.style.Style({
    stroke: new ol.style.Stroke({
    color: '#ff0000',   // red
    width: 4
    })
}));

// Create a vector source and layer. 
// This is needed to display the feature on the map
var vectorSource = new ol.source.Vector();
vectorSource.addFeature(polygonHeartFeature); 

// Create a vector layer to display the vectors
var vectorLayer = new ol.layer.Vector({
    zIndex: 2,
    source: vectorSource
});

// Add the layer to the map
map.addLayer(vectorLayer);

// Optional: Fit the view to see the entire polyline
// map.getView().fit(lineString.getExtent(), { padding: [50, 50, 50, 50] });
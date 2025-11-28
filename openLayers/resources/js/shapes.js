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
// NB: OpenLayers uses [longitude, latitude] coordinate order (Opposite of Google Maps)
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
    name: 'Molde',
    description: 'Molde is the town I grew up in, and currently work.'
});

// Add some styling to the heart polygon
polygonHeartFeature.setStyle(new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#ff0000',   // red
        width: 2
    }),
    fill: new ol.style.Fill({
        color: 'rgba(255, 0, 0, 0.25)' // semi-transparent red
    })
}));


// Add an arrow pointing to where I work
const arrowCoordinates= [
    [7.51, 62.90],
    [7.194, 62.7492],
    [7.194, 62.77],
    [7.194, 62.7492],
    [7.235, 62.7492],
];

// Create a LineString geometry and transform coordinates
var lineStringHeart = new ol.geom.LineString(arrowCoordinates).transform('EPSG:4326', 'EPSG:3857');

// Create a feature using the geometry
var lineFeature = new ol.Feature({
    geometry: lineStringHeart,
    name: 'Arrow',
});

// Style for the line
lineFeature.setStyle(new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#000000', // black
        width: 3
    })
}));


// Add a circle at the point where I live
const circleCenter = ol.proj.fromLonLat([7.6641673690567425, 62.90265148318389], 'EPSG:3857'); // Convert to map projection

var circleFeature = new ol.Feature({
    geometry: new ol.geom.Circle(circleCenter, 2000), // radius in meters
    name: 'Home',
    description: 'This is where I live, in Norway.'
});

// Style for the circle
circleFeature.setStyle(new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: '#ae00ff', // purple
        width: 4
    }),
    fill: new ol.style.Fill({
        color: 'rgba(174, 0, 255, 0.5)' // semi-transparent purple
    })
}));


// Create a vector source and layer. 
// This is needed to display the feature on the map
var vectorSource = new ol.source.Vector();
vectorSource.addFeature(polygonHeartFeature); 
vectorSource.addFeature(lineFeature);
vectorSource.addFeature(circleFeature);

// Create a vector layer to display the vectors
var vectorLayer = new ol.layer.Vector({
    zIndex: 2,
    source: vectorSource
});

// Add the layer to the map
map.addLayer(vectorLayer);


// Popup overlay for displaying info windows
var popupContainer = document.getElementById('popup');
var popupContent = document.getElementById('popup-content');
var popupOverlay = new ol.Overlay({
    element: popupContainer
});
map.addOverlay(popupOverlay);
map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
    });

    if (feature && feature.get('description') && feature.get('name')) {
        const popupText = `<strong>${feature.get('name')}</strong><br>${feature.get('description')}`;
        popupContent.innerHTML = popupText;
        popupOverlay.setPosition(evt.coordinate);
    } else { // Clicked outside any feature
        popupOverlay.setPosition(undefined);
    }
});
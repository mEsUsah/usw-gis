const buttonWrapper = new OlButtonWrapper();

const uswCoordinates = {
    lat: 51.58941782812449, 
    lng: -3.3299663047067374
};
const uswZoomLevel = 17;

// Initialize map
map = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.uswCoordinates
        center: ol.proj.fromLonLat([uswCoordinates.lng, uswCoordinates.lat], 'EPSG:3857'),
        zoom: uswZoomLevel
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


// Custom marker
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
    anchor: [0.5, 1],           // bottom center of the image
    anchorXUnits: 'fraction',
    anchorYUnits: 'fraction',
    src: '/resources/icons/mapMarker.svg', // default OL icon
    scale: 1.0
    })
});

var mrkLectureFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([-3.3293570813571094, 51.590087207305864], 'EPSG:3857')),
    name: 'USW Trefforest Accommodation',
    popupBody: '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/nathan-dumlao-xPHmmVKS8lM-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where most of my lectures are.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/courses/bsc-hons-computing/" style="text-decoration: underline;">Read more about the study program</a></p>'
});
mrkLectureFeature.setStyle(iconStyle);

var mrkAccommodationsFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([-3.330762301389285, 51.58824060534598], 'EPSG:3857')),
    name: 'Trefforest Student Accommodation',
    popupBody: '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/sincerely-media-ssDczX9Fbek-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where I live.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/accommodation" style="text-decoration: underline;">Read more about the accommodations</a></p>'
    
});
mrkAccommodationsFeature.setStyle(iconStyle);


// Create a vector source and layer. 
// This is needed to display the feature on the map
var vectorSource = new ol.source.Vector();
vectorSource.addFeature(mrkLectureFeature);
vectorSource.addFeature(mrkAccommodationsFeature);

// Create a vector layer to display the vectors
var vectorLayer = new ol.layer.Vector({
    zIndex: 3,
    source: vectorSource
});
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

    if (feature && feature.get('popupBody') && feature.get('name')) {
        const popupText = `<strong>${feature.get('name')}</strong><br>${feature.get('popupBody')}`;
        popupContent.innerHTML = popupText;
        popupOverlay.setPosition(evt.coordinate);
        map.getView().animate({
            center: evt.coordinate,
            duration: 500
        });
    } else { // Clicked outside any feature
        popupOverlay.setPosition(undefined);
    }
});
map.on('pointermove', function(e) {
    var hit = map.hasFeatureAtPixel(e.pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});
const buttonWrapper = new OlButtonWrapper();

// Initialize map
map = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.fromLonLat
        center: ol.proj.fromLonLat([-1.2577, 51.7520], 'EPSG:3857'), // Oxford, UK, Google maps CRS
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


// UK Coal resources GeoJSON overlay
const coalLayer = new ol.layer.Vector({
    zIndex: 2,
    opacity: 0.6,
});

const coalUrl = '../googleMapsApi/resources/geodata/coal_uk.geojson';
fetch(coalUrl)
    .then(response => response.json())
    .then(data => {
        const features = new ol.format.GeoJSON().readFeatures(data);
        const featureNames = Array.from(new Set(features.map(f => f.get('FEATURE'))));
        const dataFeatureColors = getFeatureColors(featureNames);
        addLegend(dataFeatureColors);
        
        coalLayer.setSource(new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: coalUrl
        }));

        coalLayer.setStyle((feature) => {
            const featureName = feature.get('FEATURE');
            return new ol.style.Style({
                fill: new ol.style.Fill({
                    color: dataFeatureColors[featureName]?.color || 'red',
                }),
                stroke: new ol.style.Stroke({
                    color: dataFeatureColors[featureName]?.outline || 'black',
                    width: 2,
                })
            });
        });
    });

const coalLayerButton = new OlButton('UK Coal resources');
coalLayerButton.element().addEventListener('click', function() {
    if (coalLayerButton.isActive) {
        map.removeLayer(coalLayer);
        coalLayerButton.off();
        document.querySelector('[data-coal-legend-container]').classList.add('hidden');
    } else {
        map.addLayer(coalLayer);
        coalLayerButton.on();
        document.querySelector('[data-coal-legend-container]').classList.remove('hidden');
    }
});
buttonWrapper.addButton(coalLayerButton.element());
        
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

    if (feature && feature.get('FEATURE')) {
        const popupText = `<strong>Feature</strong><br>${feature.get('FEATURE')}`;
        popupContent.innerHTML = popupText;
        popupOverlay.setPosition(evt.coordinate);
    } else { // Clicked outside any feature
        popupOverlay.setPosition(undefined);
    }
});
map.on('pointermove', function(e) {
    var hit = map.hasFeatureAtPixel(e.pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});




function getFeatureColors(features) {
    let output = {};
    Array.prototype.forEach.call(features, (feature, index) => {
        const hue = index * (360 / features.length);
        output[feature] = {
            name: feature,
            color: `hsl(${hue}, 100%, 50%)`,
            outline: `hsl(${hue}, 100%, 30%)`
        };
    });
    return output;
}

function addLegend(featureColors) {
    const legendElement = document.querySelector('[data-coal-legend]');

    for (const featureName in featureColors) {
        const colorInfo = featureColors[featureName];

        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'items-center', 'gap-2', 'mb-1');
        const colorBox = document.createElement('span');
        colorBox.classList.add('w-2', 'h-2', 'inline-block', 'border');
        colorBox.style.borderColor = colorInfo.outline;
        colorBox.style.backgroundColor = colorInfo.color;

        const label = document.createElement('span');
        label.textContent = featureName;

        listItem.appendChild(colorBox);
        listItem.appendChild(label);
        legendElement.appendChild(listItem);
    }
}
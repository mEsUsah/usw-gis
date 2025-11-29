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
        
// UK Railroads GeoJSON overlay
const railroadsLayer = new ol.layer.Vector({
    zIndex: 2,
    opacity: 0.7,
});

const railroadsUrl = '/googleMapsApi/resources/geodata/railways_uk.geojson';
fetch(railroadsUrl)
    .then(response => response.json())
    .then(data => {
        railroadsLayer.setSource(new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: railroadsUrl
        }));

        railroadsLayer.setStyle(new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'brown',
                width: 2,
            })
        }));
    });

const railroadsLayerButton = new OlButton('UK Railroads');
railroadsLayerButton.element().addEventListener('click', function() {
    if (railroadsLayerButton.isActive) {
        map.removeLayer(railroadsLayer);
        railroadsLayerButton.off();
    } else {
        map.addLayer(railroadsLayer);
        railroadsLayerButton.on();
    }
});
buttonWrapper.addButton(railroadsLayerButton.element());


// Earthquakes GeoJSON overlay
const earthquakesLayer = new ol.layer.Vector({
    zIndex: 3,
    opacity: 1,
});

// Custom marker
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon({
        anchor: [0.5, 1],           
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        src: '/resources/icons/mapMarker.svg',
        scale: 1.0
    })
});

// Load earthquake data and set source and style
const earthquakesUrl = '/googleMapsApi/resources/geodata/2012_earthquakes_mag5.geojson';
fetch(earthquakesUrl)
    .then(response => response.json())
    .then(data => {
        earthquakesLayer.setSource(new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: earthquakesUrl
        }));

        // Set the style for earthquake markers
        earthquakesLayer.setStyle((feature) => {
            return iconStyle;
        });
    });

const earthquakesLayerButton = new OlButton('Earthquakes');
earthquakesLayerButton.element().addEventListener('click', function() {
    if (earthquakesLayerButton.isActive) {
        map.removeLayer(earthquakesLayer);
        earthquakesLayerButton.off();
    } else {
        map.addLayer(earthquakesLayer);
        earthquakesLayerButton.on();
    }
});
buttonWrapper.addButton(earthquakesLayerButton.element());




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

    // Coal resources
    if (feature && feature.get('FEATURE')) {
        const popupText = `${feature.get('FEATURE')}`;
        popupContent.innerHTML = popupText;
        popupOverlay.setPosition(evt.coordinate);
        map.getView().animate({
            center: evt.coordinate,
            duration: 500
        });

    // Earthquakes
    } else if (feature && feature.get('Name') && feature.get('id')) {
        const time = feature.get('id');
        const data = feature.get('Name');
        const magnitude = data.split(' - ')[0];
        const place = data.split(', ')[1];
        popupContent.innerHTML = `<b class="text-[#DE0832] text-lg">Earthquake</b><br>
                            <b>Magnitude:</b> ${magnitude}<br>
                            <b>Location:</b> ${place}<br>
                            <b>Time:</b> ${time}`;;
        popupOverlay.setPosition(evt.coordinate);
        map.getView().animate({
            center: evt.coordinate,
            duration: 500
        });
    
    // Clicked outside any feature
    } else {
        popupOverlay.setPosition(undefined);
    }
});
map.on('pointermove', function(e) {
    var hit = map.hasFeatureAtPixel(e.pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});


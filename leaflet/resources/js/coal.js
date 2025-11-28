const toggleIndicatorClass = "bg-[#05ce00]";

var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView([52.0, -3.0], 7); // Centered on UK

// Add zoom control to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add openstreetmap layer
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
mapLayer.addTo(map);

const coalLayer = L.layerGroup()
let dataFeatureColors = {};

// load GeoJSON from file (found at https://www.bgs.ac.uk/datasets/coal-resources-for-new-technologies/)
fetch('/googleMapsApi/resources/geodata/coal_uk.geojson')
    .then(response => response.json())
    .then(data => {
        const features = getGeoJsonFeatures(data);
        dataFeatureColors = getFeatureColors(features);
        addLegend(dataFeatureColors);
        L.geoJSON(data, {
            style: function(feature) {
                const featureName = feature.properties['FEATURE'];
                return {
                    fillColor: dataFeatureColors[featureName]?.color || 'red',
                    color: dataFeatureColors[featureName]?.outline || 'black',
                    weight: 1
                };
            },
            onEachFeature: function (feature, layer) {
                layer.bindPopup(`${feature.properties['FEATURE']}`, {
                    closeButton: false,
                    
                });
            }
        }).addTo(coalLayer);   
        
    });

// Button to toggle Coal resources visibility
const coalButton = document.getElementById("toggle_coal");
const coalLegendContainer = document.querySelector('[data-coal-legend-container]');
coalButton.addEventListener("click", () => {
    coalButton.querySelector("[data-indicator]").classList.toggle("bg-[#05ce00]");
    if (map.hasLayer(coalLayer)) {
        map.removeLayer(coalLayer);
        coalLegendContainer.classList.add("hidden", true);
    } else {
        map.addLayer(coalLayer);
        coalLegendContainer.classList.remove("hidden", false);

    }
});

function getGeoJsonFeatures(geoJsonData) {
    let features = [];
    geoJsonData.features.forEach((feature) => {
        if (!features.includes(feature.properties.FEATURE)) {
            features.push(feature.properties.FEATURE);
        }
    });
    return features;
}

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

// Railroad
const railroadLayer = L.layerGroup();
fetch('/googleMapsApi/resources/geodata/railways_uk.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function(feature) {
                return {
                    color: '#8B4513',
                    weight: 2
                };
            }
        }).addTo(railroadLayer);
    });

// Button to toggle Railroad visibility
const railroadButton = document.getElementById("toggle_railroads");
railroadButton.addEventListener("click", () => {
    if (map.hasLayer(railroadLayer)) {
        railroadButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
        railroadButton.querySelector("[data-indicator]").classList.add("animate-ping");    
        setTimeout(() => {
            map.removeLayer(railroadLayer);
            railroadButton.querySelector("[data-indicator]").classList.remove("animate-ping");
        }, 500);
    } else {
        railroadButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
        railroadButton.querySelector("[data-indicator]").classList.add("animate-ping");
        setTimeout(() => {
            map.addLayer(railroadLayer);
            railroadButton.querySelector("[data-indicator]").classList.remove("animate-ping");
        }, 500);
    }
});


// Earthquakes
const earthquakeLayer = L.layerGroup();

fetch('/googleMapsApi/resources/geodata/2012_earthquakes_mag5.geojson')
    .then(response => response.json())
    .then(data => {
        const geoJsonLayerEarthquakes = L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                const time = feature.properties.id;
                const data = feature.properties.Name;
                const magnitude = data.split(' - ')[0];
                const place = data.split(', ')[1];
                layer.bindPopup(`<b class="text-[#DE0832] text-lg">Earthquake</b><br>
                    <b>Magnitude:</b> ${magnitude}<br>
                    <b>Location:</b> ${place}<br>
                    <b>Time:</b> ${time}`);
            },
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: '/resources/icons/mapMarker.svg',
                        iconSize: [33, 50],
                        iconAnchor: [16.5, 45],
                        popupAnchor: [0, -40],
                    }),
                });
            }
        });
        earthquakeLayer.addLayer(geoJsonLayerEarthquakes);
    });


// Button to toggle Earthquake visibility
const earthquakeButton = document.getElementById("toggle_earthquakes");
earthquakeButton.addEventListener("click", () => {
    if (map.hasLayer(earthquakeLayer)) {
        map.removeLayer(earthquakeLayer);
        earthquakeButton.querySelector("[data-indicator]").classList.remove(toggleIndicatorClass);
    } else {
        map.addLayer(earthquakeLayer);
        earthquakeButton.querySelector("[data-indicator]").classList.add(toggleIndicatorClass);
    }
});
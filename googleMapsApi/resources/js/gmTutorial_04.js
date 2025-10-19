function drawMap() {
    const mapOptions = {
        center: {lat:52.0, lng:-3.0 }, // England, UK
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        
        // remove buttons that are not needed
        disableDefaultUI: true,
        
        // enable zoom control
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);
    const coalLayer = new google.maps.Data();
    let dataFeatureColors = {};

    // load GeoJSON from file (found at https://www.bgs.ac.uk/datasets/coal-resources-for-new-technologies/)
    fetch('resources/geodata/coal_uk.geojson')
        .then(response => response.json())
        .then(data => {
            const features = getGeoJsonFeatures(data);
            dataFeatureColors = getFeatureColors(features);
            addLegend(dataFeatureColors);
            coalLayer.addGeoJson(data);
            coalLayer.setMap(null);
        });

    map.data.addListener('click', (event) => {
        console.log(event.feature.getProperty('FEATURE'));
    });

    // Button to toggle Coal resources visibility
    const coalButton = document.getElementById("toggle_coal");
    const coalLegendContainer = document.querySelector('[data-coal-legend-container]');
    coalButton.addEventListener("click", () => {
        coalButton.querySelector("[data-indicator]").classList.toggle("bg-[#05ce00]");
        const isHidden = coalLayer.getMap() === null;
        coalLayer.setMap(isHidden ? map : null);
        coalLegendContainer.classList.toggle("hidden", !isHidden);
    });

    // add colors to all features
    coalLayer.setStyle((feature) => {
        const featureName = feature.getProperty('FEATURE');
        return {
            fillColor: dataFeatureColors[featureName]?.color || 'red',
            strokeColor: dataFeatureColors[featureName]?.outline || 'black',
            strokeWeight: 1
        };
    });

    // add info window on click 
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setHeaderDisabled(true);
    coalLayer.addListener('click', (event) => {
        const featureName = event.feature.getProperty('FEATURE');
        infoWindow.setContent(featureName);
        infoWindow.setPosition(event.latLng);
        infoWindow.setMap(map);
        setTimeout(() => {
            infoWindow.close();
        }, 3000);
    });
}

function getGeoJsonFeatures(geoJsonData){
    let features = [];
    geoJsonData.features.forEach((feature) => {
        if(!features.includes(feature.properties.FEATURE)){
            features.push(feature.properties.FEATURE);
        }
    });
    return features;
}

function getFeatureColors(features){
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

function addLegend(featureColors){
    const legendElement = document.querySelector('[data-coal-legend]');

    for(const featureName in featureColors){
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

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
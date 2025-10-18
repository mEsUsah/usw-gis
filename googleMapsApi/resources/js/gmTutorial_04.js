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
    let dataFeatureColors = {};

    // load GeoJSON from file (found at https://www.bgs.ac.uk/datasets/coal-resources-for-new-technologies/)
    fetch('resources/geodata/coal_uk.geojson')
        .then(response => response.json())
        .then(data => {
            const features = getGeoJsonFeatures(data);
            dataFeatureColors = getFeatureColors(features);
            map.data.addGeoJson(data);
        });

    map.data.addListener('click', (event) => {
        console.log(event.feature.getProperty('FEATURE'));
    });

    // add colors to all features
    map.data.setStyle((feature) => {
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
    map.data.addListener('click', (event) => {
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

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
function drawMap() {
    const mapOptions = {
        center: {lat:52.0, lng:-3.0 }, // England, UK
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);

    fetch('/week_04/resources/coal_uk.geojson')
        .then(response => response.json())
        .then(data => {
            map.data.addGeoJson(data);
        });

    map.data.addListener('click', (event) => {
        console.log(event.feature.getProperty('FEATURE'));
    });

    // add colors to all features
    map.data.setStyle((feature) => {
        const featureName = feature.getProperty('FEATURE');
        let color = 'red';
        if (featureName === 'Coal bearing strata at surface') {
            color = 'yellow';
        }
        return {
            fillColor: color,
            strokeColor: 'black',
            strokeWeight: 1
        };
    });
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
function drawMap() {
    const mapOptions = {
        center: { lat: 59.9139, lng: 10.7522 }, // Oslo, Norway
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);

    fetch('/week_04/resources/coal_uk.geojson')
        .then(response => response.json())
        .then(data => {
            map.data.addGeoJson(data);
        });

}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
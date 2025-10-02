function drawMap() {
    const mapOptions = {
        center: { lat: 59.9139, lng: 10.7522 }, // Oslo, Norway
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
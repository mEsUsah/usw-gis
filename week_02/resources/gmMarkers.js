function drawMap() {
    // Create a map
    const mapOptions = {
        center: { lat: 51.47806, lng: 3.1825 }, // Zeebrugge, Belgium
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);

    // Add a marker
    var loc = new google.maps.LatLng(51.47806, 3.1825);
    var mkrOpt = {
        position: loc,
        map: map
    }
    var mkr = new google.maps.Marker(mkrOpt);
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
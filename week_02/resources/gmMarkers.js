function drawMap() {
    // Create a map
    const mapOptions = {
        center: { lat: 51.47806, lng: 3.1825 }, // Zeebrugge, Belgium
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);

    // Add a marker
    var mkrOpt = {
        position: new google.maps.LatLng(51.47806, 3.1825),
        icon: 'resources/icons/flag2.png',
        title: 'Look, a marker!',
        shape: {
            coords: [1,2, 18,3, 18,14, 5,14, 5,24, 1,24],
            type: 'poly'
        },
        map: map,
    }
    var mkr = new google.maps.Marker(mkrOpt);

    // Add an info window to the marker
    var infoWindowOpts = { 
      content: '<a href="https://en.wikipedia.org/wiki/' +
                'Liberty_Stadium">Liberty Stadium</a>' 
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOpts);
    mkr.addListener('click', function() {
        infoWindow.open(map, mkr);
    });
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
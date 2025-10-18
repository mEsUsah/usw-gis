function drawMap() {
    // Create a map
    const mapOptions = {
        center: { lat: 51.47806, lng: 3.1825 }, // Zeebrugge, Belgium
        zoom: 8,
        // remove buttons that are not needed
        disableDefaultUI: true,

        // enable map type control
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP, 
                'evilMapType', 
            ],
            position: google.maps.ControlPosition.TOP_LEFT,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        },
        
        // enable zoom control
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);


    // Add styled map types
    var evilStyle = [
        {
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#863b3b" }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                { "color": "#000000" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                { "color": "#ffff00" }
            ]
        }
    ];
    var styledMapType = new google.maps.StyledMapType(evilStyle,{
      map: map,
      name: 'Evil AF'
    });
    map.mapTypes.set('evilMapType', styledMapType);

    
    // Add a marker
    var mkrOpt = {
        position: new google.maps.LatLng(51.0, 3.1825),
        icon: 'resources/icons/mapMarker.svg',
        title: 'Look, a marker!',
        shape: {
            coords: [12.5,12.5,20],
            type: 'circle'
            
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
function drawMap() {
    // Create a map
    const mapOptions = {
        center: { lat: 51.58824060534598, lng: -3.330762301389285 }, // USW Trefforest Accommodation
        zoom: 17,
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
    var styledMapType = new google.maps.StyledMapType(evilStyle, {
        map: map,
        name: 'Evil AF'
    });
    map.mapTypes.set('evilMapType', styledMapType);


    // Add a marker
    var mkrOpt = {
        position: new google.maps.LatLng(51.58824060534598, -3.330762301389285),
        icon: 'resources/icons/mapMarker.svg',
        shape: {
            coords: [12.5, 12.5, 20],
            type: 'circle'

        },
        map: map,
    }
    var mkr = new google.maps.Marker(mkrOpt);

    // Add an info window to the marker
    var infoWindowAccommodations = new google.maps.InfoWindow({
        content: '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/sincerely-media-ssDczX9Fbek-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<div>' +
                '<p><strong>USW Accommodations</strong></p>' +
                '<p>Pen Y Fan</p>' +
                '<br>' +
                '<p>This is where I live</p>' +
            '</div>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/accommodation" style="text-decoration: underline;">Read more about the accommodations</a></p>'
    });
    mkr.addListener('click', function () {
        infoWindowAccommodations.open(map, mkr);
    });
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
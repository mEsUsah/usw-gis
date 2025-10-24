function drawMap() {
    // Create a map
    const mapOptions = {
        center: { lat: 51.58941782812449, lng: -3.3299663047067374 }, // USW Trefforest Accommodation
        zoom: 17,
        // remove buttons that are not needed
        disableDefaultUI: true,

        // enable map type control
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        mapTypeControlOptions: {
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                'noLandscapeMapType',
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
        },
    ];
    var styledMapType = new google.maps.StyledMapType(evilStyle, {
        map: map,
        name: 'Evil Overlord'
    });
    map.mapTypes.set('evilMapType', styledMapType);

    var noLandscapeStyle = [
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                { "visibility": "off" }
            ]
        },
    ];
    var noLandscapeMapType = new google.maps.StyledMapType(noLandscapeStyle, {
        map: map,
        name: 'No landscape'
    });
    map.mapTypes.set('noLandscapeMapType', noLandscapeMapType);



    // Tutorial marker
    var flagIcon = '/resources/icons/flag2.png';
    var flagShape = {
        coords: [1,2, 18,3, 18,14, 5,14, 5,24, 1,24],
        type: 'poly'
    };

    var marker1 = createMarker(
        new google.maps.LatLng(51.478056, -3.1825), 
        'Principality Stadium', 
        flagIcon, 
        flagShape, 
        '<a href="https://en.wikipedia.org/wiki/Millennium_Stadium">Principality Stadium</a>', 
        map
    );

    var marker2 = createMarker(
        new google.maps.LatLng(51.6422, -3.9351), 
        'Swansea.com Stadium', 
        flagIcon, 
        flagShape, 
        '<a href="https://en.wikipedia.org/wiki/Liberty_Stadium">Liberty Stadium</a>', 
        map
    );


    // Custom markers for CW2 --- START HERE ---
    // Add a marker for the accommodations
    var accommodationsHeaderContent = document.createElement('strong');
    accommodationsHeaderContent.appendChild(document.createTextNode('Trefforest Student Accommodation'));
    accommodationsHeaderContent.classList.add('text-md');
    var accommodationsContent = '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/sincerely-media-ssDczX9Fbek-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where I live.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/accommodation" style="text-decoration: underline;">Read more about the accommodations</a></p>';

    var mrkAccommodations = createMarkerCustom(
        new google.maps.LatLng(51.58824060534598, -3.330762301389285),
        'Trefforest Student Accommodation',
        accommodationsHeaderContent,
        accommodationsContent,
        map
    );
    
    
    // Add a marker for the lecuture building
    var lectureHeaderContent = document.createElement('strong');
    lectureHeaderContent.appendChild(document.createTextNode('USW Building'));
    lectureHeaderContent.classList.add('text-md');
    var leactureContent = '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/nathan-dumlao-xPHmmVKS8lM-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where most of my lectures are.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/courses/bsc-hons-computing/" style="text-decoration: underline;">Read more about the study program</a></p>';

    var mrkLecture = createMarkerCustom(
        new google.maps.LatLng(51.590087207305864, -3.3293570813571094),
        'USW Building',
        lectureHeaderContent,
        leactureContent,
        map
    );
    // Custom markers for CW2 --- END HERE ---
}

function createMarker(point, title, icon, iconShape, info, map) {
    var markerOpts = {
        title: title,
        position: point,
        icon: icon,
        shape: iconShape,
        map: map
    };
    var marker = new google.maps.Marker(markerOpts);
    var infoWindowOpts = {content: info};
    var infoWindow = new google.maps.InfoWindow(infoWindowOpts);
        google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map,marker);
    });
    return marker;
}

function createMarkerCustom(point, title, header, content, map) {
    const markerIcon = {
        icon: '/resources/icons/mapMarker.svg',
        shape: {
            coords: [12.5, 12.5, 20],
            type: 'circle'
        }
    }
    
    var markerOpts = {
        title: title,
        position: point,
        icon: markerIcon.icon,
        shape: markerIcon.shape,
        map: map
    };
    var marker = new google.maps.Marker(markerOpts);
    var infoWindowOpts = {
        headerContent: header,
        content: content
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOpts);
        google.maps.event.addListener(marker, 'click', function() {
        infoWindow.open(map,marker);
    });
    return marker;
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
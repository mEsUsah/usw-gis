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


    // Reusable marker icon and shape
    const markerIcon = {
        icon: 'resources/icons/mapMarker.svg',
        shape: {
            coords: [12.5, 12.5, 20],
            type: 'circle'
        }
    }

    // Add a marker for the accommodations
    var mrkAccommodations = new google.maps.Marker({
        position: new google.maps.LatLng(51.58824060534598, -3.330762301389285),
        icon: markerIcon.icon,
        shape: markerIcon.shape,
        map: map,
    });
    var accommodationsHeaderContent = document.createElement('strong');
    accommodationsHeaderContent.appendChild(document.createTextNode('Trefforest Student Accommodation'));
    accommodationsHeaderContent.classList.add('text-md');
    var infoWindowAccommodations = new google.maps.InfoWindow({
        headerContent: accommodationsHeaderContent,
        content: '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/sincerely-media-ssDczX9Fbek-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where I live.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/accommodation" style="text-decoration: underline;">Read more about the accommodations</a></p>'
    });
    mrkAccommodations.addListener('click', function () {
        infoWindowAccommodations.open(map, mrkAccommodations);
    });
    
    
    // Add a marker for the lecuture building
    var mrkLectures = new google.maps.Marker({
        position: new google.maps.LatLng(51.590087207305864, -3.3293570813571094),
        icon: markerIcon.icon,
        shape: markerIcon.shape,
        map: map,
    });
    var lectureHeaderContent = document.createElement('strong');
    lectureHeaderContent.appendChild(document.createTextNode('USW Building'));
    lectureHeaderContent.classList.add('text-md');
    var infoWindowLectures = new google.maps.InfoWindow({
        headerContent: lectureHeaderContent,
        content: '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/nathan-dumlao-xPHmmVKS8lM-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where most of my lectures are.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/courses/bsc-hons-computing/" style="text-decoration: underline;">Read more about the study program</a></p>'
    });
    mrkLectures.addListener('click', function () {
        infoWindowLectures.open(map, mrkLectures);
    });

    map.addListener('click', function (event) {
        console.log("Map clicked at: " + event.latLng.toString());
    });
}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
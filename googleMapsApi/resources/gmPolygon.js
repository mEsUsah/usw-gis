function drawMap() {
    const mapOptions = {
        center: { lat: 62.73547927593037, lng: 7.156011858986631 }, // Molde, Norway
        zoom: 9,
        
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        }, 
        streetViewControl: false,

    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);

    // Draw a heart-shaped polygon around Molde
    const polygonHeart = new google.maps.Polygon({
        path: [
            { lat: 62.65, lng: 7.2 },
            { lat: 62.75, lng: 7.375 },
            { lat: 62.81, lng: 7.4 },
            { lat: 62.85, lng: 7.33 },
            { lat: 62.85, lng: 7.26 },
            { lat: 62.82, lng: 7.2 },
            { lat: 62.85, lng: 7.14 },
            { lat: 62.85, lng: 7.07 },
            { lat: 62.81, lng: 7.0 },
            { lat: 62.75, lng: 7.025 },
        ],
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
    });
    var infoWindowMolde = new google.maps.InfoWindow({
        content: 'Molde is the town I grew up in, and currently work.',
        headerDisabled: true

    });
    polygonHeart.addListener('click', (event) => {
        infoWindowMolde.setPosition(event.latLng);
        infoWindowMolde.open(map);
        setTimeout(() => {
            infoWindowMolde.close();
        }, 2000);
    });
    polygonHeart.setMap(null);


    // Draw a an arrow pointing to where I work
    const line = new google.maps.Polyline({
        path: [
            { lat: 62.90, lng: 7.51 },
            { lat: 62.7492, lng: 7.194 },
            { lat: 62.77, lng: 7.194 },
            { lat: 62.7492, lng: 7.194 },
            { lat: 62.7492, lng: 7.235 },
        ],
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
    });
    line.setMap(null);


    // Adding a circle marker to indicate where i live
    const pointMarker = new google.maps.Circle({
        center: new google.maps.LatLng(62.90265148318389, 7.6641673690567425),
        radius: 1000,
        strokeColor: '#ae00ff',
        fillColor: '#ae00ff',
        fillOpacity: 0.5,
        map: map,
    });
    pointMarker.setMap(null);
    var infoWindowHome = new google.maps.InfoWindow({
        content: 'This is where I live, in Norway.',
        headerDisabled: true

    });
    pointMarker.addListener('click', function (event) {
        infoWindowHome.setPosition(event.latLng);
        infoWindowHome.open(map);
        setTimeout(() => {
            infoWindowHome.close();
        }, 2000);
    });

    // Button to toggle heart, arrow and point visibility
    const moldeButton = document.getElementById("toggle_molde");
    moldeButton.addEventListener("click", () => {
        moldeButton.querySelector("[data-indicator]").classList.toggle("bg-[#05ce00]");
        const isHidden = polygonHeart.getMap() === null;
        polygonHeart.setMap(isHidden ? map : null);
        pointMarker.setMap(isHidden ? map : null);
        line.setMap(isHidden ? map : null);

        if (isHidden) {
            map.setZoom(9);
            map.setCenter({ lat: 62.73547927593037, lng: 7.156011858986631 });
        }
    });


    // Norwegian border outline
    const goeJsonNorwayBorder = "/googleMapsApi/resources/norway.geojson";
    const goeJsonNorwayBorderLayer = new google.maps.Data();
    goeJsonNorwayBorderLayer.loadGeoJson(goeJsonNorwayBorder);
    goeJsonNorwayBorderLayer.setStyle({
        fillColor: 'transparent',
        strokeColor: '#ff9354ff',
        strokeWeight: 1,
    });
    goeJsonNorwayBorderLayer.setMap(null); // Start with layer hidden
    
    // Button to toggle Norway border visibility
    const norwayButton = document.getElementById("toggle_norway");
    norwayButton.addEventListener("click", () => {
        norwayButton.querySelector("[data-indicator]").classList.toggle("bg-[#05ce00]");
        const isHidden = goeJsonNorwayBorderLayer.getMap() === null;
        goeJsonNorwayBorderLayer.setMap(isHidden ? map : null);
        
        // show the inteire outline when activating
        if (isHidden) {
            map.setZoom(4);
            map.setCenter({ lat: 64.5, lng: 12.0 });
        }   
    });
}

// Check if the Google Maps API has loaded before adding the map
if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
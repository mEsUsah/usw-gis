function drawMap() {
    const mapOptions = {
        center: { lat: 59.9139, lng: 10.7522 }, // Oslo, Norway
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("map_space"), mapOptions);

    const polygonCoords = [
        { lat: 60.0, lng: 10.0 },
        { lat: 60.0, lng: 11.0 },
        { lat: 61.0, lng: 11.0 },
        { lat: 61.0, lng: 10.0 },
    ];

    const polygon = new google.maps.Polygon({
        path: polygonCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
    });
    polygon.addListener('click', () => {
        console.log('Polygon clicked!');
    });

    polygon.setMap(map);

}

if (typeof google === 'object' && typeof google.maps === 'object') {
    drawMap();
}
const uswCoordinates = { 
    lat: 51.58941782812449, 
    lng: -3.3299663047067374 }; // USW Trefforest;
    const uswZoom = 17;


var map = L.map('map_space', {
    'zoomControl': false,
})
map.setView(uswCoordinates, uswZoom); // USW Trefforest

// Add zoom control to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Add openstreetmap layer
const mapLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
mapLayer.addTo(map);

// Marker layer
const markerLayer = L.layerGroup().addTo(map);

// Accomodation Marker
const accomodattionMarker = L.marker([51.58824060534598, -3.330762301389285],{
    icon: L.icon({
        iconUrl: '/resources/icons/mapMarker.svg',
        iconSize: [33, 50],
        iconAnchor: [16.5, 45],
        popupAnchor: [0, -40],
    }),
}).addTo(markerLayer);
accomodattionMarker.bindPopup('<b class="text-lg">Trefforest Student Accommodation</b><br>' +
            '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/sincerely-media-ssDczX9Fbek-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where I live.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/accommodation" style="text-decoration: underline;">Read more about the accommodations</a></p>',{ 
    closeButton: false 
});

const lecureBuilidingMarker = L.marker([51.590087207305864, -3.3293570813571094],{
    icon: L.icon({
        iconUrl: '/resources/icons/mapMarker.svg',
        iconSize: [33, 50],
        iconAnchor: [16.5, 45],
        popupAnchor: [0, -40],
    }),
}).addTo(markerLayer);
lecureBuilidingMarker.bindPopup('<b class="text-lg">USW Building</b><br>' +
            '<div class="flex flex-row">' +
            '<img src="/googleMapsApi/resources/images/nathan-dumlao-xPHmmVKS8lM-unsplash.jpg" alt="View from the student accommodation" class="h-20 mr-4"/>' +
            '<p>This is where most of my lectures are.</p>' +
            '</div>' +
            '<p class="mt-4"><a href="https://www.southwales.ac.uk/courses/bsc-hons-computing/" style="text-decoration: underline;">Read more about the study program</a></p>',{ 
    closeButton: false 
});
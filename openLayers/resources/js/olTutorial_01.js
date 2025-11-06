
map1 = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.fromLonLat
        center: ol.proj.fromLonLat([10.7522, 59.9139], 'EPSG:3857'), // Oslo, Norway, Google maps CRS
        zoom: 7
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    target: 'map_space'
});
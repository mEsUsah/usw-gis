
map1 = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.fromLonLat
        center: ol.proj.fromLonLat([10.7522, 59.9139], 'EPSG:3857'), // Oslo, Norway, Google maps CRS
        zoom: 7
    }),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM(),
            zIndex: 1,
        }),
        new ol.layer.Heatmap({
            title: 'Earthquakes heatmap',
            source: new ol.source.Vector({
                url: 'https://openlayers.org/en/v4.6.5/examples/data/kml/2012_Earthquakes_Mag5.kml',
                format: new ol.format.KML({
                    extractStyles: false
                })
            }),
            blur: 15,
            radius: 4,
            zIndex: 2,
            gradient: ['#0f0','#ff0', '#f00']
        })
    ],
    target: 'map_space'
});


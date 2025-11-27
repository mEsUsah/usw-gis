const buttonWrapper = new OlButtonWrapper();
const button = new OlButton('Heatmap');
button.on(); // Set initial state to "on"
buttonWrapper.addButton(button.element());

const control = new ol.control.Control({
    element: buttonWrapper.element()
});

const map = new ol.Map({
    view: new ol.View({
        // https://openlayers.org/en/v4.6.5/apidoc/ol.proj.html#.fromLonLat
        center: ol.proj.fromLonLat([116.5, 6.0], 'EPSG:3857'), // Borneo
        zoom: 4
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
            radius: 5,
            zIndex: 2,
            name: "heatmapLayer"
        })
    ],
    controls: ol.control.defaults().extend([
        control
    ]),
    target: 'map_space'
});

// Button event listener to toggle heatmap layer
button.element().addEventListener('click', function () {
    map.getLayers().forEach(function (layer) {
        if (layer.get('name') === "heatmapLayer" && layer.getVisible()) {
            layer.setVisible(false);
            button.off();
        } else if (layer.get('name') === "heatmapLayer" && !layer.getVisible()) {
            layer.setVisible(true);
            button.on();
        }
    });
});
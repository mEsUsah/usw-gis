class olButton {
    constructor(buttonText) {

    }
}

let buttonElement = document.createElement('button');
buttonElement.className = 'ol-button';
buttonElement.style.width = 'fit-content';
buttonElement.style.padding = '0 0.5rem';
buttonElement.style.height = '2rem';
buttonElement.style.display = 'flex';
buttonElement.classList.add('flex-row', 'items-center', 'gap-2', );

let indicatorActiveClass = 'bg-[#05ce00]';
let buttonIcon = document.createElement('span');
buttonIcon.setAttribute('data-indicator', '');
buttonIcon.classList.add('h-[8px]', 'w-[8px]', 'border', 'border-white', 'rounded');
buttonIcon.classList.add(indicatorActiveClass);
buttonElement.appendChild(buttonIcon);


let buttonTextElement = document.createElement('span');
buttonTextElement.innerHTML = 'Heatmap';
buttonTextElement.classList.add('text-sm');
buttonElement.appendChild(buttonTextElement);

let buttonWrapper = document.createElement('div');
buttonWrapper.appendChild(buttonElement);
buttonWrapper.className = 'ol-unselectable ol-control';
buttonWrapper.style.top = '0.5em';
buttonWrapper.style.right = '0.5em';
buttonWrapper.style.position = 'absolute';

const control = new ol.control.Control({
    element: buttonWrapper
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
buttonElement.addEventListener('click', function () {
    const indicator = buttonElement.querySelector('[data-indicator]');
    map.getLayers().forEach(function (layer) {
        if (layer.get('name') === "heatmapLayer" && layer.getVisible()) {
            layer.setVisible(false);
            indicator.classList.remove(indicatorActiveClass);
        } else if (layer.get('name') === "heatmapLayer" && !layer.getVisible()) {
            layer.setVisible(true);
            indicator.classList.add(indicatorActiveClass);
        }
    });
});
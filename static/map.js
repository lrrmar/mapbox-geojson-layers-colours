mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yY2V0ZWFtIiwiYSI6ImNsYTJkMzFkdDBlM3Yzb3BlbzV0MDAzaHoifQ.FIb3SfFn_ACoWJ1EuRajJw';
const coordinates = document.getElementById('coordinates');
const map = new mapboxgl.Map({
	container: 'map',
	// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
	style: 'mapbox://styles/forceteam/clefkoauc001201qgm91i3kn6',
	projection: 'mercator',
	center: [-2.1654, 50.8569],
	zoom: 7,
	dragPan: true,
});

map.fitBounds([[-3.0, 50.3],[-1.5, 51.5]])


const canvas = map.getCanvasContainer();
// From here: https://venngage.com/tools/accessible-color-palette-generator
const color_legend = {
    '0_5': '#00bf7d',
    '5_10': '#00b4c5',
    '10_15': '#0073e6',
    '15_20': '#2546f0',
    '20_25': '#5928ed;'
}

map.on('load', () => {
    console.log("map loaded");

    $.ajax({
        method: "GET",
        url: "/geojson",
        dataType: "json",
        contentType: "application/json",
        success: function (returnedData, successStr, jqXHR) {

            let wrf_data_overlay = returnedData;
            console.log(wrf_data_overlay);

            for (feat in wrf_data_overlay['features']) {
                feature = wrf_data_overlay['features'][feat];
                layer_color = color_legend[feature['properties']['level']]
                console.log('Level: ', feature['properties']['level']);
                console.log('Color: ', layer_color);

                map.addSource(feat, {
                    'type': 'geojson',
                    'data': feature,
                    'buffer': 0
                });
                
                map.addLayer({
                    'id': feat,
                    'type': 'fill',
                    'source': feat,
                    'paint': {
                        'fill-color': layer_color,
                        'fill-opacity': 0.4
                    }
                });
}}})});

mapboxgl.accessToken = 'pk.eyJ1IjoiZm9yY2V0ZWFtIiwiYSI6ImNsYTJkMzFkdDBlM3Yzb3BlbzV0MDAzaHoifQ.FIb3SfFn_ACoWJ1EuRajJw';
const coordinates = document.getElementById('coordinates');
const map = new mapboxgl.Map({
	container: 'map',
	// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
	style: 'mapbox://styles/mapbox/light-v11',
	projection: 'mercator',
	center: [-2.1654, 50.8569],
	zoom: 7,
	dragPan: true,
});

map.fitBounds([[-3.0, 50.3],[-1.5, 51.5]])


const canvas = map.getCanvasContainer();
// From here: https://venngage.com/tools/accessible-color-palette-generator
//const color_legend = {
//    '-4_-2': '#00282E',
//    '-2_0': '#004851',
//    '0_2': '#006C7A',
//    '2_4': '#26C6DA',
//    '4_6': '#00BED6',
//    '6_8': '#6BEFF9',
//    '8_10': '#D4F4F8'
//}


map.on('load', () => {
    console.log("map loaded");

    $.ajax({
        method: "GET",
        url: "/geojson",
        dataType: "json",
        contentType: "application/json",
        success: function (returnedData, successStr, jqXHR) {

            let wrf_data_overlay = returnedData;
			let colour_palette = wrf_data_overlay['hex_palette'];

            for (feat in wrf_data_overlay['features']) {
                feature = wrf_data_overlay['features'][feat];
                layer_color = colour_palette[feature['properties']['level']]

                map.addSource(feat, {
                    'type': 'geojson',
                    'data': feature,
                });
                
                map.addLayer({
                    'id': feat + '_fill',
                    'type': 'fill',
                    'source': feat,
                    'paint': {
                        'fill-color': layer_color,
                        'fill-outline-color': 'rgba(0, 0, 0, 0.5)',
                        'fill-opacity': 0.4,
                    }
                });
}}})});

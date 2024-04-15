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

const color_legend = {
    '0.1_0.5': '#00282E',
    '0.5_1.0': '#004851',
    '1.0_2.0': '#006C7A',
    '2.0_5.0': '#26C6DA',
    '5.0_10.0': '#00BED6',
    '10.0_100.0': '#6BEFF9',
    '8_10': '#D4F4F8'
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
                //console.log('Level: ', feature['properties']['level']);
                //console.log('Color: ', layer_color);

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

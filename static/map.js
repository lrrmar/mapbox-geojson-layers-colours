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

map.on('load', () => {
//Add a geojson point source.
//Heatmap layers also work with a vector tile source.
    console.log("map loaded");

    $.ajax({
        method: "GET",
        url: "/geojson",
        dataType: "json",
        contentType: "application/json",
        success: function (returnedData, successStr, jqXHR) {

            wrf_data_overlay = JSON.parse(returnedData);
            console.log(wrf_data_overlay);

var tileIndex = geojsonvt(wrf_data_overlay);
console.log(tileIndex);
console.log(tileIndex.getTile(5,15,10));
console.log(map.style);

map.addSource('grid_test', {
    'type': 'geojson',
    'data': wrf_data_overlay,
    'buffer': 0
});

map.addLayer(
  {
        'id': 'grid_test',
        'type': 'fill',
        'source': 'grid_test',
        'paint': {
            'fill-color': ['interpolate',
            ['linear'], ['get', 'wa.p.925.6'],
            -0.1,
            'rgba(255,0,0,0.4)',
            0,
            'rgba(0,0,255,0.4)',
            0.1,
            'rgba(0,255,0,0.4)'],
            'fill-outline-color': 'rgba(0,0,0,0)'
        }
    })

}})});

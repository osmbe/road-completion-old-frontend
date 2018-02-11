/*global mapboxgl*/
mapboxgl.accessToken = "pk.eyJ1Ijoiam9vc3RzY2hvdXBwZSIsImEiOiJjaWh2djF1c2owMmJrdDNtMWV2c2Rld3QwIn0.9zXJJWZ4rOcspyFIdEC3Rw";

window.app.map = new mapboxgl.Map({
    "container": "map", // container id
    "style": window.app.styles.aiv,
    // style: 'mapbox://styles/mapbox/satellite-v9',
    // style: 'mapbox://styles/xivk/cjdd899nbbm7y2spdd9xq6xil', // stylesheet location
    "center": [4.4629, 51.0671], // starting position [lng, lat]
    "zoom": 9, // starting zoom
    "hash": true
});

// Add zoom and rotation controls to the map.
window.app.map.addControl(new mapboxgl.NavigationControl({
    "showCompass": false
}), "top-left");

var selectedFeature = "";

window.app.map.on("click", function (e) {
    // reset currently selected feature.
    if (selectedFeature) {
        window.app.map.setFilter("diffs-hover", ["==", "id", ""]);
        window.app.map.setFilter("diffs-details-hover", ["==", "id", ""]);
        selectedFeature = "";
    }

    // search in small box around click location.
    var point = e.point;
    var width = 10;
    var height = 20;
    var features = window.app.map.queryRenderedFeatures([
        [point.x - width / 2, point.y - height / 2],
        [point.x + width / 2, point.y + height / 2]
    ], {
        layers: ["diffs", "diffs-details"]
    });

    if (features && features[0] && features[0].properties && features[0].properties.id) {
        selectedFeature = features[0].properties.id;

        window.app.map.setFilter("diffs-hover", ["==", "id", selectedFeature]);
        window.app.map.setFilter("diffs-details-hover", ["==", "id", selectedFeature]);

        document.getElementById("features").innerHTML = JSON.stringify(features[0], null, 2);
    }

    if (!selectedFeature) {
        document.getElementById("features").innerHTML = "";
    }
});

document.getElementById("layer-switch").addEventListener("change", function () {
    window.app.map.setStyle(window.app.styles[this.value]);
});

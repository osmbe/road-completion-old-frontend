mapboxgl.accessToken = 'pk.eyJ1Ijoiam9kaWRlbG9vZiIsImEiOiJjamplYjRqbGY0bW5qM2tsZmpocHNiZmxyIn0.nGxW_OofuTFsGJNDUSm50A';

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9',
    // style: 'mapbox://styles/mapbox/satellite-v9',
    // style: 'mapbox://styles/xivk/cjdd899nbbm7y2spdd9xq6xil', // stylesheet location
    center: [4.380068778991699, 50.85095984723529], // starting position [lng, lat]
    zoom: 14, // starting zoom
    hash: true
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on("load", function () {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].id.includes("road")) {
            firstSymbolId = layers[i].id;
            break;
        }
    }

    // replace road tiles with road tiles for this instance.
    map.addSource("buffers", {
        "type": "vector",
        "tiles": [
            "http://roads-tiles.osm.be/data/buffers/{z}/{x}/{y}.pbf"
        ],
        "maxzoom": 14
    });

    map.addSource("diffs", {
        "type": "vector",
        "tiles": [
            "http://roads-tiles.osm.be/data/diffs/{z}/{x}/{y}.pbf"
        ],
        "maxzoom": 14
    });

    map.addLayer({
        "id": "buffers",
        "source": "buffers",
        "source-layer": "buffers",
        "type": "fill",
        "paint": {
            "fill-color": "blue",
            "fill-opacity": 0.05
        },
        "minzoom": 14
    }, firstSymbolId);

    map.addLayer({
        "id": "diffs-details",
        "source": "diffs",
        "source-layer": "diffs",
        "type": "line",
        "paint": {
            "line-color": "red",
            "line-width": 10,
            "line-opacity": 0.2
        },
        "minzoom": 16
    });

    map.addLayer({
        "id": "diffs",
        "source": "diffs",
        "source-layer": "diffs",
        "type": "line",
        "paint": {
            "line-color": "red",
            "line-width": 4
        },
        "maxzoom": 16
    });

    map.addLayer({
        "id": "diffs-details-hover",
        "source": "diffs",
        "source-layer": "diffs",
        "type": "line",
        "paint": {
            "line-color": "red",
            "line-width": 15,
            "line-opacity": 0.5
        },
        "filter": ["==", "id", ""],
        "minzoom": 16
    });

    map.addLayer({
        "id": "diffs-hover",
        "type": "line",
        "source": "diffs",
        "source-layer": "diffs",
        "paint": {
            "line-color": "red",
            "line-width": 6
        },
        "filter": ["==", "id", ""],
        "maxzoom": 16
    });
});

var selectedFeature = "";

map.on('click', function (e) {
    // reset currently selected feature.
    if (selectedFeature) {
        map.setFilter("diffs-hover", ["==", "id", ""]);
        map.setFilter("diffs-details-hover", ["==", "id", ""]);
        selectedFeature = "";
        hideSidePanel();
    }

    // search in small box around click location.
    var point = e.point;
    var width = 10;
    var height = 20;
    var features = map.queryRenderedFeatures([
        [point.x - width / 2, point.y - height / 2],
        [point.x + width / 2, point.y + height / 2]],
        { layers: ["diffs", "diffs-details"] });

    if (features && features[0] && features[0].properties && features[0].properties.id) {

        if (selectedFeature) {
            map.setFilter("diffs-hover", ["==", "id", ""]);
            map.setFilter("diffs-details-hover", ["==", "id", ""]);
            selectedFeature = "";
        }

        selectedFeature = features[0].properties.id;

        map.setFilter("diffs-hover", ["==", "id", selectedFeature]);
        map.setFilter("diffs-details-hover", ["==", "id", selectedFeature]);

        showFeatureDetails(features);
        showSidePanel();

    }

    if (!selectedFeature) {
        document.getElementById('features').innerHTML = "";
    }
});

function showFeatureDetails(features) {
    document.getElementById('features').innerHTML = '<div class="slide-head"><h2 class="slide-text">Info</h2></div>';
    document.getElementById('features').innerHTML += '<hr>';
    document.getElementById('features').innerHTML += '<p class="slide-text"><b>Street: </b>' + features[0].properties["orginal:RSTRNM"] + '</p>';
    document.getElementById('features').innerHTML += '<p class="slide-text"><b>City: </b>' + features[0].properties['orginal:LBLBEHEER'] + '</p>';
    document.getElementById('features').innerHTML += '<a target="_blank" href="https://www.openstreetmap.org/edit#map=' + map.getZoom() + '/' + map.getCenter()["lat"] + '/' + map.getCenter()["lng"] + '" class="edit-btn btn btn-primary">Edit</a>';
    document.getElementById('features').innerHTML += `
            <hr>
            <div class="dropdown">
                <a class="status-btn btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Set a status
                </a>
            
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#" id="fixedStatus">Fixed</a>
                    <a class="dropdown-item" href="#">False positive</a>
                </div>
            </div>
    `;
    document.getElementById('features').innerHTML += `
        <div id="fixed-alert" class="alert alert-success" role="alert">
            This issue has been marked as fixed
        </div>
    `;


    $('#fixedStatus').click(
        function (e) {
            
            if (confirm("Please confirm you want to mark the issue as fixed")) {
                //mark as fixed
                setFixed(features[0]);
                document.getElementById('fixed-alert').style.opacity = 1;
                setTimeout(function(){
                    document.getElementById('fixed-alert').style.opacity = 0;
                }, 3000);
            } else {
                //canceled
            }
            
        }
    );
}


function setFixed(feature) {
    console.log(feature);
    
}

function hideSidePanel() {
    document.getElementById("features").style.width = "0px";
    document.getElementById("features").style.padding = "0px";
    document.getElementById("features").style.paddingTop = "0px";
}

function showSidePanel() {
    document.getElementById("features").style.width = "400px";
    document.getElementById("features").style.padding = "30px";
    document.getElementById("features").style.paddingTop = "90px";
}

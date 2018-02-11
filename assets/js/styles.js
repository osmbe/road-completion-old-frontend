window.app = {};
window.app.styles = {
    "mapbox": {
        "version": 8,
        "sources": {
            "mapbox-streets": {
                "type": "raster",
                "url": "mapbox://mapbox.dark",
                "tileSize": 256
            }
        },
        "layers": [
            {
                "id": "background-color",
                "type": "background",
                "paint": {
                    "background-color": "rgb(4,7,14)"
                }
            },
            {
                "id": "background",
                "type": "raster",
                "source": "mapbox-streets",
                "minzoom": 0,
                "maxzoom": 22
            }
        ]
    },
    "aiv": {
        "version": 8,
        "sources": {
            "aiv": {
                "type": "raster",
                "tiles": [
                    "http://tile.informatievlaanderen.be/ws/raadpleegdiensten/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=omwrgbmrvl&STYLE=&FORMAT=image/png&tileMatrixSet=GoogleMapsVL&tileMatrix={z}&tileRow={y}&tileCol={x}"
                ],
                "tileSize": 256
            }
        },
        "layers": [
            {
                "id": "background-color",
                "type": "background",
                "paint": {
                    "background-color": "rgb(4,7,14)"
                }
            },
            {
                "id":"background",
                "type":"raster",
                "source":"aiv"
            }
        ]
    }
};

/* **
 *
 */
Object.keys(window.app.styles).map(function(key) {
    // Add sources
    window.app.styles[key].sources.buffers = {
        "type": "vector",
        "tiles": [
            "http://roads-tiles.osm.be/data/buffers/{z}/{x}/{y}.pbf"
        ],
        "maxzoom": 14
    };

    window.app.styles[key].sources.diffs = {
        "type": "vector",
        "tiles": [
            "http://roads-tiles.osm.be/data/diffs/{z}/{x}/{y}.pbf"
        ],
        "maxzoom": 14
    };

    /*window.app.styles[key].sources.refs = {
        "type": "vector",
        "tiles": [
            "http://roads-tiles.osm.be/data/refs/{z}/{x}/{y}.pbf"
        ],
        "maxzoom": 14
    };*/

    // Add layers
    window.app.styles[key].layers.push({
        "id": "buffers",
        "source": "buffers",
        "source-layer": "buffers",
        "type": "fill",
        "paint": {
            "fill-color": "#FFFFFF",
            "fill-opacity": 0.2
        },
        "minzoom": 14
    });

    window.app.styles[key].layers.push({
        "id": "diffs-details",
        "source": "diffs",
        "source-layer": "diffs",
        "type": "line",
        "paint": {
            "line-color": "#FFFF00",
            "line-width": 10,
            "line-opacity": 0.2
        },
        "minzoom": 16
    });

    window.app.styles[key].layers.push({
        "id": "diffs",
        "source": "diffs",
        "source-layer": "diffs",
        "type": "line",
        "paint": {
            "line-color": "#FFFF00",
            "line-width": 2
        },
        "maxzoom": 16
    });

    window.app.styles[key].layers.push({
        "id": "diffs-details-hover",
        "source": "diffs",
        "source-layer": "diffs",
        "type": "line",
        "paint": {
            "line-color": "#FFFF00",
            "line-width": 15,
            "line-opacity": 0.5
        },
        "filter": ["==", "id", ""],
        "minzoom": 16
    });

    window.app.styles[key].layers.push({
        "id": "diffs-hover",
        "type": "line",
        "source": "diffs",
        "source-layer": "diffs",
        "paint": {
            "line-color": "#FFFF00",
            "line-width": 6
        },
        "filter": ["==", "id", ""],
        "maxzoom": 16
    });
});

var geojsonStream = require("geojson-stream"),
    fs = require('fs');


let output_database_res;
let output_diff_res = [];

var diff_output = fs.createReadStream('output.geojson');
var targetStream = fs.createWriteStream('new_output.geojson');
var parser = geojsonStream.parse();
var writer = geojsonStream.stringify();
writer.pipe(targetStream);


parser.on('data', function (data) {
    output_diff_res.push(data);
    for (let i in output_database_res) {

        let fixed = output_database_res[i];

        if (data.properties.id == fixed.hash) {
            data.properties.status = fixed.status;
            data.properties.userId = fixed.userId;
            writer.write(data);
        }

    }
}).on('end', function () {
    writer.end();
});

fs.readFile('output.json', function (err, data) {
    output_database_res = JSON.parse(data);
    diff_output.pipe(parser);
});


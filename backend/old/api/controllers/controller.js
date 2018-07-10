'use strict';

var fs = require('fs');
var dataDir = "./data/"

exports.list_all = function(req, res) {
    var all = [];

    fs.readdir(dataDir, function(err, items) {
        if (err) throw err;
        for (var i=0; i<items.length; i++) {
            var data = fs.readFileSync(dataDir + items[i], (err) => {
                if (err) throw err;
            });

            all.push(JSON.parse(data));
        }
        res.json(all);
    });
};

exports.create_a = function(req, res) {
    var data = req.body;

    if (data && data.id && data.status) {
        fs.writeFile (dataDir + data.id + ".json",
            JSON.stringify(data), function() {
                res.json(data);
            });
    }
};

exports.read_a = function(req, res) {
    var id = req.params.id;
    if (id) {
        var fileName = dataDir + id + ".json";

        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            res.json(JSON.parse(data));
          });
    }
};
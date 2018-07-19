var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Issue = mongoose.model('Issue');
var request = require('request');
var xmldoc = require('xmldoc');

/* GET home page. */
router.get('/', (req, res, next) => {
    res.send('Notes server works!');
});

router.get('/ISSUE/:hash', (req, res, next) => {
    Issue.findOne({ "hash": req.params.hash }, (err, issue) => {
        if (err) return next(err);
        if (!issue) return next(new Error('Not found ' + req.params.id));
        //res.send('Got an issue?');
        res.json(issue);
    });
});

// Post an issue
router.post('/', (req, res, next) => {

    request.get({
        url: 'https://www.openstreetmap.org/api/0.6/user/details',
        oauth: {
            consumer_key: req.body.c_key,
            consumer_secret: req.body.c_scrt,
            token: req.body.token,
            token_secret: req.body.secret
        }
    }, function (e, r, body) {

        if (body != "Couldn't authenticate you") {

            let lat = req.body.lat;
            let lon = req.body.lon;
            let text = req.body.text;
            let issueHash = req.body.hash;

            request.post(`https://master.apis.dev.openstreetmap.org/api/0.6/notes?lat=${lat}&lon=${lon}&text=${text}`, function callback(err, httpResponse, http_body) {

                var nameNode = new xmldoc.XmlDocument(http_body);
                var id = nameNode.descendantWithPath("note.id").val;
                Issue.findOne({ "hash": issueHash }, (err, iss) => {

                    if (err)
                        return next(err);

                    if (!iss) {
                        let issue = new Issue();
                        issue.status = 'none';
                        issue.hash = issueHash;
                        issue.note = text;
                        issue.noteId = id;

                        issue.save((err, savedIssue) => {

                            if (err)
                                return next(err);

                            //execute id change before saving
                            res.json(savedIssue);
                        });

                    } else {
                        //if it exist, change the status to the new status
                        Issue.findOneAndUpdate(
                            { "hash": issueHash },
                            {
                                $set: {
                                    "note": text,
                                    "noteId": id
                                }
                            },
                            (err, updatedIssue) => {
                                res.json(updatedIssue);
                            }
                        );
                    }
                });
            });
        } else {
            res.statusCode = 401;
            res.send('Not authenticated');
        }

    });

});

module.exports = router;


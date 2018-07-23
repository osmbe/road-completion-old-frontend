var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Issue = mongoose.model('Issue');
var request = require('request');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Server works!');
});

router.get('/ISSUE/:hash', (req, res, next) => {
  Issue.findOne({ "hash": req.params.hash }, (err, issue) => {
    if (err) return next(err);
    if (!issue) return next(new Error('Not found ' + req.params.id));
    res.json(issue);
  });
});

// Post an issue
router.post('/ISSUE/', (req, res, next) => {

  request.get({
    url: 'https://www.openstreetmap.org/api/0.6/user/details',
    oauth: {
      consumer_key: req.body.c_key,
      consumer_secret: req.body.c_scrt,
      token: req.body.token,
      token_secret: req.body.secret,
      
    }
  }, function (e, r, body) {

    if (body != "Couldn't authenticate you") {
      let issue = new Issue(req.body);
      issue.userId = req.body.user_id;

      Issue.findOne({ "hash": issue.hash }, (err, iss) => {

        if (err)
          return next(err);

        if (!iss) {

          issue.save((err, savedIssue) => {

            if (err)
              return next(err);

            //execute id change before saving
            res.json(savedIssue);
          });

        } else {
          //if it exist, change the status to the new status
          Issue.findOneAndUpdate(
            { "hash": issue.hash },
            {
              $set: {
                "status": issue.status
              }
            },
            (err, updatedIssue) => {
              res.json(issue);
            }
          );
        }
      });
    }else{
      res.statusCode = 401;
      res.send('Not authenticated');
    }

  });

});


//get set status issue by user
router.post('/ISSUE/USER/', (req, res, next) => {

  request.get({
    url: 'https://www.openstreetmap.org/api/0.6/user/details',
    oauth: {
      consumer_key: req.body.c_key,
      consumer_secret: req.body.c_scrt,
      token: req.body.token,
      token_secret: req.body.secret,
    }
  }, function (e, r, body) {

    if (body != "Couldn't authenticate you") {

      Issue.findOne({ "userId": req.body.user_id }, (err, iss) => {

        if (err)
          return next(err);

        if (iss) {

          res.json(iss);
 
        } 
      });
    }else{
      res.statusCode = 401;
      res.send('Not authenticated');
    }

  });

});

// Return all issues
router.get('/ISSUES/', (req, res, next) => {
  Issue.find({ "status": "fixed" }, (err, iss) => {
    res.json(iss);
  });
});

router.get('/NONEISSUES/', (req, res, next) => {
  Issue.find({ "status": "none" }, (err, iss) => {
    res.json(iss);
  });
});

// If we get a POST request with the /ISSUES/ route,
// we delete the fixed issues
router.post('/ISSUES/', (req, res, next) => {
  Issue.find({ "status": "fixed" }, (err, iss) => {
    res.json(iss);
  });
});

// TODO: WRITE LOG INTO A TXT FILE

module.exports = router;

/*
// I don't think we need this for the moment
router.param('ISSUE', (req, res, next, id) => {
  let query = Issue.findById(id);
  query.exec((err, issue) => {
    if(err) return next(err);
    if (!recipe) return next(new Error('Not found ' + id));
    req.issue = issue;
    return next();
  });
});

router.get('/ISSUE/:id',(req, res, next) => {
  res.json(req.issue);
});
*/

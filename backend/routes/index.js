var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Issue = mongoose.model('Issue');

/* GET home page. */
router.get('/', (req, res, next)  => {
  res.send('Server works!');
});

router.get('/ISSUE/:id', (req, res, next) => {
  let query = Issue.findById(req.params.id);
  query.exec((err, issue) => {
    if (err) return next(err);
    if (!issue) return next(new Error('Not found ' + req.params.id));
    res.send('Got an issue?');
    res.json(issue);
  });
});

// Post an issue
router.post('/ISSUE/', (req, res, next) => {
  let issue = new Issue(req.body);
  //if(Issue.findById(issue._id))
    //next(new Error('Issue already exists, please try modifying its status'));
  issue.save((err, req) => {
    if (err) return next(err);
    //execute id change before saving
    res.send('Posted an issue');
    res.json(req);
  });
});

// Return all issues
router.get('/ISSUES/', (req, res, next) => {
  Issue.find((err, issues) => {
    if (err) return next(err);
    res.send('Got all issues');
    res.json(issues);
  });
});

// If we get a POST request with the /ISSUES/ route,
// we delete the fixed issues
router.post('/ISSUES/', (req, res, next) => {
  Issue.deleteMany( { "status": "fixed" } );
  res.send('Deleted all fixed issues');
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
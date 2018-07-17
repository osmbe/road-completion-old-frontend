var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var passport = require('passport');
var osmStrategy = require('../models/Strategy');

passport.use(osmStrategy);

// Apparently the ensureAuthenticated function needs to be created for 
var ensureAuthenticated = (req,res,next) => {
    /*if(req.isAuthenticated()) { return next(); }
    else
    {
        // Return error or redirect
        res.redirect(('/AUTH/login'));
        //res.send(false);
    }*/
    req.isAuthenticated() ? next() : 
        res.failureRedirect('/AUTH/login');
}

router.get('/', (req, res) => {
    res.send({});
});

router.get('/account', ensureAuthenticated, (req, res) => {
    res.send({user: req.user});
});

router.get('/login', (req, res) => {
    res.redirect('/AUTH/openstreetmap/');
});

router.get('/openstreetmap', passport.authenticate('openstreetmap'),
(req, res) => {});

router.get('/isAuth', (req, res) => {
    res.json({ username: req.user} );
});

router.get('/openstreetmap/callback', passport.authenticate('openstreetmap', { failureRedirect: '/login'}), (req, res) => {
    //res.redirect('/AUTH/isAuth');
    res.send({username: req.user});
});

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (err) return next(err);
        return res.send({authenticated: req.isAuthenticated()});
    });
});

module.exports = router;
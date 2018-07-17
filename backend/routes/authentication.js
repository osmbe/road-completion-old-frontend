var express = require('express');
var createError = require('http-errors');
var router = express.Router();
var passport = require('passport');
var osmStrategy = require('../models/Strategy');

passport.use(osmStrategy);

// Apparently the ensureAuthenticated function needs to be created for 
var ensureAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()) { return next(); }
    else
    {
        // Return error or redirect
        res.redirect(('/AUTH/openstreetmap'));
        //res.send(false);
    }
}

router.get('/', (req, res) => {
    res.render('index', {user: req.user});
});

router.get('/account', ensureAuthenticated, (req, res) => {
    res.send({user: req.user.displayName});
});

router.get('/login', passport.authenticate('openstreetmap', {failureRedirect: '/login'}), (req, res) => {
    res.render('login', {user: req.user.username});
});

router.get('/openstreetmap', passport.authenticate('openstreetmap'),
(req, res) => {});

router.get('/isAuth',  (req, res) => {
    res.json({ username: req.user.username} );
});

router.get('/openstreetmap/callback', passport.authenticate('openstreetmap', { failureRedirect: '/login'}), (req, res) => {
    res.redirect('/AUTH/account');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
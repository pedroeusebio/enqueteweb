var express = require('express');
var router = express.Router();
import passport from 'passport';
var passport_config = require('../passport/facebook.js');
var local_config = require('../passport/local.js');
var local_signup = require('../passport/signup.js');
var fb_passport = passport_config.fb_passport(passport);
var local_passport = local_config.local_passport(passport);
var singup = local_signup.signup_passport(passport);
/* GET home page. */

export const isLogged =  (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth');
    }
}

router.get('/', function(req, res, next) {
    let info = req.flash('info')[0];
    let element =  req.flash('error')[0];
    res.render('login', { title: 'Express' , error: element, info: info});
});

router.get('/facebook',passport.authenticate('facebook', {scope: 'email'}));
router.get('/facebook/callback',
	         passport.authenticate('facebook', {failureRedirect: '/auth'}),
           (req, res) => {
               res.redirect('/');
           });


router.post('/login', passport.authenticate('local',{
	successRedirect:'/',
	failureRedirect: '/auth',
	failureFlash: true
}));

router.get('/create', (req, res) => {
    let text = req.flash('error')[0];
	  res.render('create', {error: text});
});

router.post('/create', passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: 'create',
    failureFlash: true
}));

router.get('/logout', isLogged, (req, res) => {
    req.logout();
    res.redirect('/auth');
});

module.exports = router;

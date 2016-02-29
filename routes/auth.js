var express = require('express');
var router = express.Router();
import passport from 'passport';
var passport_config = require('../passport/facebook.js');
var fb_passport = passport_config.fb_passport(passport);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/facebook',passport.authenticate('facebook', {scope: 'email'}));
router.get('/facebook/callback', 
	passport.authenticate('facebook', {
		successRedirect:'/users',
		failureRedirect: '/'
	})
);

module.exports = router;

var express = require('express');
var router = express.Router();
var auth = require('./auth.js');

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('info', 'Entre no Sistema para realizar a Operação');
        res.redirect('/auth');
    }
}

/* GET users listing. */
router.get('/', isLogged, function(req, res, next) {
    res.json(req.user);
});

module.exports = router;

var express = require('express');
var router = express.Router();

const isLogged = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth');
    }
}
/* GET home page. */
router.get('/', isLogged, function(req, res, next) {
    res.render('index', { user: req.user, active: 'home' });
});

module.exports = router;

var localStrategy =  require('passport-local').Strategy;
var user = require('../db/usuario.js');
import bcrypt from 'bcrypt-nodejs';

export const signup_passport = (passport) => {
    passport.use('local-signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        user.findOneByEmail(username).then(r => {
            if(r.length > 0 ) return done(null, false, {message: 'email já cadastrado'});
            console.log(req.body);
            let validator =  user.validation(req.body);
            if(!validator.validator){
                return done(null, validator.validator, validator.message);
            }
            console.log(password);
            bcrypt.hash(password, null, null, (err, hash) => {
                if(err) return done(null, false, {message: 'aconteceu algum erro interno, tente novamente mais tarde'});
                console.log(hash);
                req.body.password = hash;
                user.create(req.body).then(r => done(null, true, r));
            });
        })
    }));
}

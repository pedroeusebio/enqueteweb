var localStrategy =  require('passport-local').Strategy;
var user = require('../db/usuario.js');

export const local_passport = (passport) => {
	passport.use('local', new localStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, username, password, done) => {
		user.findOneByEmail(username).then(r => {
			if( r.length < 0) {
				return done(null, false, {message:'usuário não encontrado'});
			}
			user.checkPassword(password, r[0].password, (err,result) => {
				if(!result) {
					return done(null, false, {message: 'usuário ou senha incorretos'});
				} else {
            return done (null, r[0]);
        }
			});
		});
	}));
}

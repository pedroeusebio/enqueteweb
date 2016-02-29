var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('../fb.js');
var user = require('../db/usuario.js');

export const fb_passport = (passport) => {
	passport.use('facebook', new FacebookStrategy({
		clientID: fbConfig.config.appID,
		clientSecret : fbConfig.config.appSecret,
		callbackURL: fbConfig.config.callbackUrl,
		profileFields: ['id','displayName', 'email', 'photos']
	},
	(access_token, refresh_token, profile, done) => {
		user.findOneByFacebook(profile.id).then( r => {
			if(r.length > 0) {
				return done(null, r[0])
			} else {
				let user_info = {
					facebook_id: profile.id,
					access_token: access_token,
					email: profile.emails[0].value,
					name: profile.displayName,
					estado_usuario_id: 0
				};
				user.createByFacebook(user_info).then(r => {
					return done(null, r);
				})
			}
		});
	}));
}
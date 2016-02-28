var FacebookStrategy = require('passport-facebook').Strategy;
var fbConfig = require('../fb.js');
var user = require('../db/usuario.js');

export const fb_passport = (passport) => {
	passport.use('facebook', new FacebookStrategy({
		clientID: fbConfig.config.appID,
		clientSecret : fbConfig.config.appSecret,
		callbackURL: fbConfig.config.callbackUrl
	},
	(acess_token, refresh_token, profile, done) => {
		user.findOneByFacebook(profile.id).then( r => {
			if(r.length > 0) {
				return done(null, r[0])
			} else {
				let user_info = {
					id: profile.id,
					acess_token: acess_token,
					email: profile.emails[0].value,
					name: profile.name.givenName + " " + profile.name.familyName
				};
				user.createByFacebook(user_info).then(r => {
					return done(null, r);
				})
			}
		});
	}));
}
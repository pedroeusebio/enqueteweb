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
        let id = profile.id;
			  if(r.length > 0) {
				  return done(null, r[0]);
			} else {
				let user_info = {
					facebook_id: id,
					access_token: access_token,
					email: profile.emails[0].value,
					name: profile.displayName,
					estado_usuario_id: 0
				};
				user.findOneByEmail(profile.emails[0].value).then(ret => {
					if(ret.length > 0) {
						  user.update(ret[0].id, user_info).then(rs => {
                  done(null, rs);
              });
					} else {
						  user.createByFacebook(user_info).then(res => {
                  user.getById(res[0]).then(usr => done(null,usr[0]) );
              });
					}
				});
			}
		});
	}));
}

var User = require('../thesis/model/user');
var configAuth = require('./auth');
var passport =  require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
// var Model = require('../thesis/model/facebook');

module.exports = function(passport) {
	app.use(passport.initialize());
	app.use(passport.session());
	passport.use('facebook', new FacebookStrategy({
    	clientID: configAuth.facebookAuth.clientID,
    	clientSecret: configAuth.facebookAuth.clientSecret,
    	callbackURL: configAuth.facebookAuth.callbackURL
  	 },
  	 function(accessToken, refreshToken, profile, done) {
    	process.nextTick(function() {
    		User.findOne({'facebook.id': profile.id}, function(err, user) {
    			if(err) {return done(err); }
    			if(user) {
    				return done(null, user);
    			} else {
    				var newUser = new User();
    				newUser.facebook.id = profile.id;
    				newUser.facebook.token = accessToken;
    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyname;
    				newUser.facebook.email = profile.emails[0].value;

    				newUser.save(function(err) {
    					if(err) { throw err; }
    					return done(null, newUser);
    				})
    			}
    		})
    	})
  	 }
	));

	
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findbyId(id, function(err, user) {
			done(err, user);
		});
	});
}
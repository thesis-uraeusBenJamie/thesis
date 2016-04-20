'use strict';

let
 GoogleStrategy = require ('passport-google-oauth').OAuth2Strategy,
 Promise = require('bluebird'),
 config = require('../config.json');

module.exports = function(passport, sequelize) {
    const
        User = sequelize.import("../model/user"),
        Google = sequelize.import("../model/google");
        
    User.hasOne(Google, {foreignKey: 'idUser'});
    Google.belongsTo(User, {foreignKey: 'idUser'});
        
    function findGoogleUser(idUser) {
        return new Promise(function(resolve, reject){
            User.findOne({
              where: {
                id: idUser
              },
              attributes: ['nameFirst', 'nameLast', 'email', 'desc', 'img', 'username'],
              include: [{
                model: Google,
                attributes: ['idGoogle', 'token', 'displayName', 'gmail']
              }]
            })
            .then(function(user) {
                resolve(user);
            })
            .catch(function(err) {
                reject(err);
            });
        });
    }
    
    function findGoogleUserByGoogleId(idGoogle) {
        return new Promise(function(resolve, reject){
            Google.findOne({
              where: { idGoogle: idGoogle }
            }).then(function(google) {
                if(google) {
                    findGoogleUser(google.idUser).then(function(user) {
              		var date = new Date();
            	  var minutes = 30;
            	  date.setTime(date.getTime() + (minutes * 60 * 1000));
           		   res.cookie("name", user.dataValues.nameFirst, {
           		     expires: date
           		   });
           		   res.cookie("id", user.dataValues.id, {
           		     expires: date
             	 });
              res.redirect('/#/profile');
                        resolve(user);
                    });
                } else {
                    reject();
                }
            });
        });
    }
        
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('serializeUser ------------------------------');
        var converted = JSON.parse(JSON.stringify(user));
        console.dir(converted);
        done(null, converted.google.idGoogle);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('deserializeUser ------------------------------');
        console.dir(id);
        findGoogleUserByGoogleId(id).then(function(user) {
            if(user) return done(null, user);
            throw Error('No user found!');
        });
    });
    
    passport.use(new GoogleStrategy({
        clientID: "583757200523-dkje7m5ih74iertghm19nl9ghp3b1irr.apps.googleusercontent.com",
        clientSecret: "7uenS8wDjG5gSsVGW_mscaHI",
        callbackURL: "http://127.0.0.1:1738/auth/google/callback"
    },
    function(res, token, refreshToken, profile, done) {
    	console.log(res);
        
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
        	
            Google.findOne({
              where: { idGoogle: profile.id }
            }).then(function(google) {
                if(google) {
                    findGoogleUser(google.idUser).then(function(user) {
                        done(null, user);
                    });
                } else {
                    User.create({
                    	nameLast: profile.name.familyName,
                    	nameFirst: profile.name.givenName,
                        username: profile.displayName,
                        email: profile.emails[0].value
                    })
                    .then(function(user) {
                        Google.create({
                            idUser: user.id,
                            idGoogle: profile.id,
                            token: token,
                            refreshToken: refreshToken,
                            displayName: profile.displayName,
                            gmail: profile.emails[0].value
                        })
                        .then(function(google) {
                            findGoogleUser(google.idUser).then(function(user) {
            					var date = new Date();
            					var minutes = 30;
            					date.setTime(date.getTime() + (minutes * 60 * 1000));
            					res.cookie("name", User.nameFirst, {
              					expires: date
            					});
            					res.cookie("id", User.id, {
              					expires: date
            					});
            					res.redirect('/#/profile');
                                done(null, user);
                            });
                        }).catch(function(err) {
                            throw err;
                        });
                    });
                }
            });
        });
    }));

};




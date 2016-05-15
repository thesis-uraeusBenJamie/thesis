'use strict';

module.exports = function(sequelize) {

  const
    User = sequelize.import("../model/user"),
    UserTwitter = sequelize.import("../model/userTwitter"),
    Twitter = require('twitter'),
    twitter = new Twitter({
      consumer_key: "qH7DD6LmUCPk4q2JawKAcOtoa",
      consumer_secret: "OUscGt59cwvN3L8741DgdksRc4eTLDIpcz35jFyCvuuwBZYM9Z",
      access_token_key:   "715896409526960128-uzwsJRuYPbNCinQ3uUOgbTpl1uniYbE",
      access_token_secret:  "m0ug8GI0GbEZiqtmb4Y4RW0ICpLIOC9wgyckAjRyxyM2E"

    });

  return {
    create: function(req, res) {
      UserTwitter.findOne({
        where: {
          idUser: idUser
        }
      }).then(function(twitter) {
        if (twitter) {
          res.status(200);
        } else {
          User.findOne({
            where: {
              id: req.params.id
            }
          }).then(function(user) {
            if (user) {
              var newUserTwitter = {
                idUser: profile.id,
                screenName: profile.screenName
              };
              UserTwitter.create(newUserTwitter).then(function() {
                res.status(200).json([user, newUserTwitter]);
              });
            } else {
              res.status(404).send("No user exists with id");
            }

          });
        }
      });


    },
    get: function(req, res) {
      User.findOne({
        where: {
          id: req.params.id
        },
      }).then(function(user) {
        if (user) {
          UserTwitter.findOne({
            where: {
              idUser: profile.id
            },
          }).then(function(userTwitter) {
            if (!userTwitter) {
              res.json([]);
            } 
          });
        }
      });
    }
  };
};

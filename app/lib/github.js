var exports = module.exports;
var config = require('./config');
var passport = require('passport');
var passportGithub = require('passport-github2');
var User = require('./../models/user');

var GithubStrategy = passportGithub.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

exports.getGithubStrategy = function (){
  return new GithubStrategy({
    clientID: config.getConfig('githubClientID'),
    clientSecret: config.getConfig('githubClientSecret'),
    callbackURL: config.getConfig('githubCallbackURL')
  },
  function(accessToken, refreshToken, profile, done) {
    done(
      null,
      new User(profile.username, profile.displayName));
  });
}

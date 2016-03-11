var express = require('express');
var router = express.Router();
var passport = require('passport');
var controller = require('./../controllers/auth');

router.get('/', passport.authenticate('github'));
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  controller.loginSuccess
);

module.exports = router;


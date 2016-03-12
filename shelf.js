var express = require('express');
var app = express();
var busboy = require('express-busboy');
var config = require('./app/lib/config');
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var messages = require('express-messages');
var passport = require('passport');

var config = require('./app/lib/config');
var github = require('./app/lib/github');

var authRoutes = require('./app/routes/auth');
var rootRoutes = require('./app/routes/root');
var shelfRoutes = require('./app/routes/shelf');

busboy.extend(app, {upload: true});

var requestLogger = function (req, res, next) {
  req.requestTime = Date.now();
  console.log(req.requestTime + " - " + req.method + ": " + req.originalUrl);
  next();
};

var isAuthenticated = function(req, res, next) {
  if (req.user !== undefined) {
    return next();
  }
  res.redirect('/auth');
};

var checkForFlash = function(req, res, next) {
  res.locals.messages = messages(req, res);
  next();
};

passport.use(github.getGithubStrategy());

app.set('view engine', 'jade');

app.use(cookieSession({
  name: 'session',
  keys: [config.getConfig('appSecret')]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(requestLogger);
app.use(flash());
app.use(checkForFlash);
app.use(express.static('./app/static'));
app.use('/auth', authRoutes);
app.use('/', isAuthenticated, rootRoutes);
app.use('/shelf', isAuthenticated, shelfRoutes);

app.listen(3000, function () {
  console.log('Shelf is listening on port 3000!');
});

var express = require('express');
var app = express();
var config = require('./app/lib/config');
var cookieSession = require('cookie-session');
var passport = require('passport');

var config = require('./app/lib/config');
var github = require('./app/lib/github');
var rootRoutes = require('./app/routes/root');
var authRoutes = require('./app/routes/auth');

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
}

passport.use(github.getGithubStrategy());

app.set('view engine', 'jade');

app.use(cookieSession({
  name: 'session',
  keys: [config.getConfig('appSecret')]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(requestLogger);
app.use(express.static('./app/static'));
app.use('/auth', authRoutes);
app.use('/', isAuthenticated, rootRoutes);

app.listen(3000, function () {
  console.log('Shelf is listening on port 3000!');
});

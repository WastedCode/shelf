var express = require('express');
var app = express();
var rootRoutes = require('./app/routes/root');

var requestLogger = function (req, res, next) {
  console.log(Date.now() + " - " + req.method + ": " + req.originalUrl);
  next();
};

app.use(requestLogger);
app.use(express.static('./app/static'));
app.use('/', rootRoutes);

app.listen(3000, function () {
  console.log('Shelf is listening on port 3000!');
});

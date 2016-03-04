var express = require('express');
var app = express();
var rootRoutes = require('./app/routes/root');

app.use('/', rootRoutes);

app.listen(3000, function () {
  console.log('Shelf is listening on port 3000!');
});

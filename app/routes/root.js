var express = require('express');
var router = express.Router();
var controller = require('./../controllers/root');

// define the home page route
router.get('/', controller.index);

module.exports = router;

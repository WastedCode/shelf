var express = require('express');
var router = express.Router();
var controller = require('./../controllers/shelf');

// define the home page route
router.post('/', controller.addToShelf);

module.exports = router;

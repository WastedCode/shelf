var exports = module.exports;
var imageSize = require('image-size');
var Image = require('./../models/image.js');

function isValidImage(file) {
  var validMimes = ['image/jpeg', 'image/png', 'image/gif'];
  if (validMimes.indexOf(file.mimetype) == -1) return false;
  return true;
}

function wasImageProvided(file) {
  if (file == null) return false;
  if (file.filename == '') return false;
  return true;
}

exports.addToShelf = function (req, res) {
  if (!wasImageProvided(req.files.uploadImage)) {
    req.flash("error", "Please provide an image");
  } else if (!isValidImage(req.files.uploadImage)) {
    req.flash("error", "Invalid image");
  } else {
    console.log(req.files.uploadImage);
    var dimensions = imageSize(req.files.uploadImage.file);
    console.log(dimensions.width, dimensions.height);
    var image = new Image();
    image.createFromExistingImage(req.files.uploadImage, function(err) {
      console.log(err);
    });
    req.flash("info", "All good");
  };

  res.redirect('/');
};

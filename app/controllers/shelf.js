var exports = module.exports;

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
    req.flash("info", "All good");
  };

  res.redirect('/');
};

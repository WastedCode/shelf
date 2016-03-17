var fs = require('fs-extra');
var imageSize = require('image-size');
var path = require('path');
var randomstring = require('randomstring');

/*
function Image() {
  this.source = '';
  this.name = '';
  this.dimensions = {height: 0, width: 0};
};

Image.prototype.createFromExistingImage = function(image, done) {
  this.dimensions = imageSize(image.file);
  this.originalName = image.fileName;
}
*/

function Image() {
}

Image.prototype.createFromExistingImage = function(image, done) {
  this.createFromFile(image.filename, image.file, done);
}

Image.prototype.createFromFile = function(fileName, file, done) {
  var size = this.getImageSize(file);
  var newFilePath = this.getPathForFileName(fileName, size);
  fs.copy(file, newFilePath, function(err) {
    done(err);
  });
}

Image.prototype.getPathForFileName = function(fileName, size) {
  var directory = appRoot + '/uploads/images/';
  var fileFullPath = directory + this.getNewFileName(fileName, size);
  fs.ensureDir(path.normalize(directory));
  return path.normalize(fileFullPath);
}

Image.prototype.getNewFileName = function(fileName, size) {
  var nameStrings = [
    randomstring.generate(8),
    size,
    fileName.replace(/\W+/g, "")];
  return nameStrings.join('_');
}

Image.prototype.getImageSize = function(file) {
  var size = imageSize(file);
  return size.height + 'x' + size.width;
}

module.exports = Image;

var env = require('./../../env.json');
var exports = module.exports;

exports.allConfig = function () {
  var node_env = process.env.NODE_ENV || 'development';
  return env[node_env];
}

exports.getConfig = function (configName) {
  config = exports.allConfig();
  return config[configName];
}


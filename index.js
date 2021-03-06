'use strict';

var through = require('through2');
var PistachioCompiler = require('kdf-pistachio/lib/file-compiler')
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-kdf-pistachio';

module.exports = function () {

  return through.obj(function (file, enc, cb) {

    if (file.isStream()) {
      return cb(new PluginError( PLUGIN_NAME, 'Streaming not supported'));
    }

    if (file.isNull()){
      return cb(null, file);
    }

    var contents;

    try {
      contents = PistachioCompiler.compile(file.contents.toString('utf8')).toString('utf8');
    } catch (err) {
      return cb(new PluginError(PLUGIN_NAME, err));
    } finally {
      file.contents = new Buffer(contents);
      return cb(null, file);
    }

  });

};

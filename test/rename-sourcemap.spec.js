'use strict';

var rename = require('../index');
var gutil = require('gulp-util');
var sourceMaps = require('gulp-sourcemaps');
require('should');

describe('gulp-rename', function () {

  context('when file has source map', function () {

    it ('updates source map file to match relative path of renamed file', function (done) {

      var init = sourceMaps.init();
      var stream = init
        .pipe(rename({ prefix: 'test-' }))
        .pipe(rename({ prefix: 'test-' }));

      stream.on('data', function (file) {
        file.sourceMap.file.should.equal('test-test-fixture.css');
        file.sourceMap.file.should.equal(file.relative);
        done();
      });

      init.write(new gutil.File({
        base: 'fixtures',
        path: 'fixtures/fixture.css',
        contents: new Buffer('')
      }));

      init.end();

    });

  });

});

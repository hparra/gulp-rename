'use strict';
/* global helper, helperError */

require('./spec-helper');
var rename = require('../');
var gulp = require('gulp');
var Path = require('path');

describe('gulp-rename', function() {
  context('with string parameter', function() {
    context('when src pattern does not contain directory glob', function() {
      it('sets filename to value', function(done) {
        var srcPattern = 'test/fixtures/hello.txt';
        var obj = 'hola.md';
        var expectedPath = 'test/fixtures/hola.md';
        helper(srcPattern, obj, expectedPath, done);
      });
    });
    context('when src pattern contains directory glob', function() {
      it('sets relative path to value', function(done) {
        var srcPattern = 'test/**/hello.txt';
        var obj = 'fixtures/hola.md';
        var expectedPath = 'test/fixtures/hola.md';
        helper(srcPattern, obj, expectedPath, done);
      });
    });
  });

  context('with object parameter', function() {
    var srcPattern;
    beforeEach(function() {
      srcPattern = 'test/**/hello.txt';
    });

    context('with empty object', function() {
      it('has no effect', function(done) {
        var obj = {};
        var expectedPath = 'test/fixtures/hello.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
    });

    context('with dirname value', function() {
      it('replaces dirname with value', function(done) {
        var obj = {
          dirname: 'elsewhere'
        };
        var expectedPath = 'test/elsewhere/hello.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
      it("removes dirname with './'", function(done) {
        var obj = {
          dirname: './'
        };
        var expectedPath = 'test/hello.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
      it('removes dirname with empty string', function(done) {
        var obj = {
          dirname: ''
        };
        var expectedPath = 'test/hello.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
    });

    context('with prefix value', function() {
      it('prepends value to basename', function(done) {
        var obj = {
          prefix: 'bonjour-'
        };
        var expectedPath = 'test/fixtures/bonjour-hello.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
    });

    context('with basename value', function() {
      it('replaces basename with value', function(done) {
        var obj = {
          basename: 'aloha'
        };
        var expectedPath = 'test/fixtures/aloha.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
      it('removes basename with empty string (for consistency)', function(done) {
        var obj = {
          prefix: 'aloha',
          basename: ''
        };
        var expectedPath = 'test/fixtures/aloha.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
    });

    context('with suffix value', function() {
      it('appends value to basename', function(done) {
        var obj = {
          suffix: '-hola'
        };
        var expectedPath = 'test/fixtures/hello-hola.txt';
        helper(srcPattern, obj, expectedPath, done);
      });
    });

    context('with extname value', function() {
      it('replaces extname with value', function(done) {
        var obj = {
          extname: '.md'
        };
        var expectedPath = 'test/fixtures/hello.md';
        helper(srcPattern, obj, expectedPath, done);
      });
      it('removes extname with empty string', function(done) {
        var obj = {
          extname: ''
        };
        var expectedPath = 'test/fixtures/hello';
        helper(srcPattern, obj, expectedPath, done);
      });
    });
  });

  context('with function parameter', function() {
    var srcPattern;
    beforeEach(function() {
      srcPattern = 'test/**/hello.txt';
    });

    it('receives object with dirname', function(done) {
      var obj = function(path) {
        path.dirname.should.equal('fixtures');
        path.dirname = 'elsewhere';
      };
      var expectedPath = 'test/elsewhere/hello.txt';
      helper(srcPattern, obj, expectedPath, done);
    });

    it('receives object with basename', function(done) {
      var obj = function(path) {
        path.basename.should.equal('hello');
        path.basename = 'aloha';
      };
      var expectedPath = 'test/fixtures/aloha.txt';
      helper(srcPattern, obj, expectedPath, done);
    });

    it('receives object with extname', function(done) {
      var obj = function(path) {
        path.extname.should.equal('.txt');
        path.extname = '.md';
      };
      var expectedPath = 'test/fixtures/hello.md';
      helper(srcPattern, obj, expectedPath, done);
    });

    it('receives object from return value', function(done) {
      var obj = function(path) {
        return {
          dirname: path.dirname,
          basename: path.basename,
          extname: '.md'
        };
      };
      var expectedPath = 'test/fixtures/hello.md';
      helper(srcPattern, obj, expectedPath, done);
    });

    it('ignores null return value but uses passed object', function(done) {
      var obj = function(path) {
        path.extname.should.equal('.txt');
        path.extname = '.md';
        return null;
      };
      var expectedPath = 'test/fixtures/hello.md';
      helper(srcPattern, obj, expectedPath, done);
    });

    it('receives object with extname even if a different value is returned', function(done) {
      var obj = function(path) {
        path.extname.should.equal('.txt');
        path.extname = '.md';
      };
      var expectedPath = 'test/fixtures/hello.md';
      helper(srcPattern, obj, expectedPath, done);
    });
  });

  context('in parallel streams', function() {
    it('only changes the file in the current stream', function(done) {
      var files = gulp.src('test/fixtures/hello.txt');

      var pipe1 = files.pipe(rename({ suffix: '-1' }));
      var pipe2 = files.pipe(rename({ suffix: '-2' }));
      var end1 = false;
      var end2 = false;
      var file1;
      var file2;

      function check() {
        file1.path.should.equal(Path.resolve('test/fixtures/hello-1.txt'));
        file2.path.should.equal(Path.resolve('test/fixtures/hello-2.txt'));

        return done();
      }

      pipe1
        .on('data', function(file) {
          file1 = file;
        })
        .on('end', function() {
          end1 = true;

          if (end2) {
            return check();
          }
        });

      pipe2
        .on('data', function(file) {
          file2 = file;
        })
        .on('end', function() {
          end2 = true;

          if (end1) {
            return check();
          }
        });
    });
  });

  context('throws unsupported parameter type', function() {
    var srcPattern;
    beforeEach(function() {
      srcPattern = 'test/**/hello.txt';
    });

    var UNSUPPORTED_PARAMATER = 'Unsupported renaming parameter type supplied';
    it('with undefined object', function(done) {
      var obj;
      var expectedError = UNSUPPORTED_PARAMATER;
      helperError(srcPattern, obj, expectedError, done);
    });

    it('with null object', function(done) {
      var obj = null;
      var expectedError = UNSUPPORTED_PARAMATER;
      helperError(srcPattern, obj, expectedError, done);
    });

    it('with empty string', function(done) {
      var obj = '';
      var expectedError = UNSUPPORTED_PARAMATER;
      helperError(srcPattern, obj, expectedError, done);
    });

    it('with boolean value', function(done) {
      var obj = true;
      var expectedError = UNSUPPORTED_PARAMATER;
      helperError(srcPattern, obj, expectedError, done);
    });

    it('with numeric value', function(done) {
      var obj = 1;
      var expectedError = UNSUPPORTED_PARAMATER;
      helperError(srcPattern, obj, expectedError, done);
    });
  });
});

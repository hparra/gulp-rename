'use strict';
/* global helper */

require('./spec-helper');
var Path = require('path');

describe('gulp-rename path parsing', function() {
  describe('dirname', function() {
    context('when src pattern contains no globs', function() {
      it("dirname is '.'", function(done) {
        var srcPattern = 'test/fixtures/hello.txt';
        var obj = function(path) {
          path.dirname.should.equal('.');
        };
        helper(srcPattern, obj, null, done);
      });
    });

    context('when src pattern contains filename glob', function() {
      it("dirname is '.'", function(done) {
        var srcPattern = 'test/fixtures/*.min.txt';
        var obj = function(path) {
          path.dirname.should.equal('.');
        };
        helper(srcPattern, obj, null, done);
      });
    });

    var dirnameHelper = function(srcPattern) {
      it('dirname is path from directory glob to file', function(done) {
        var obj = function(path) {
          path.dirname.should.match(/^fixtures[0-9]?$/);
        };
        helper(srcPattern, obj, null, done);
      });
    };

    context('when src pattern matches a directory with *', function() {
      dirnameHelper('test/*/*.min.txt');
    });

    context('when src pattern matches a directory with **', function() {
      dirnameHelper('test/**/*.min.txt');
    });

    context('when src pattern matches a directory with [...]', function() {
      dirnameHelper('test/fixt[a-z]res/*.min.txt');
    });

    context('when src pattern matches a directory with {...,...}', function() {
      dirnameHelper('test/f{ri,ixtur}es/*.min.txt');
    });

    /* SKIP: glob2base does not handle brace expansion as expected. See wearefractal/glob2base#1 */
    context.skip(
      'when src pattern matches a directory with {#..#}',
      function() {
        dirnameHelper('test/fixtures{0..9}/*.min.txt');
      }
    );

    context('when src pattern matches a directory with an extglob', function() {
      dirnameHelper('test/f+(ri|ixtur)es/*.min.txt');
    });

    context('when src pattern includes `base` option', function() {
      it('dirname is path from given directory to file', function(done) {
        var srcPattern = 'test/**/*.min.txt';
        var srcOptions = { base: process.cwd() };
        var obj = function(path) {
          path.dirname.should.equal(Path.join('test', 'fixtures'));
        };
        helper({ pattern: srcPattern, options: srcOptions }, obj, null, done);
      });
    });
  });

  describe('basename', function() {
    it('strips extension like Path.basename(path, ext)', function(done) {
      var srcPattern = 'test/fixtures/hello.min.txt';
      var obj = function(path) {
        path.basename.should.equal('hello.min');
        path.basename.should.equal(
          Path.basename(srcPattern, Path.extname(srcPattern))
        );
      };
      helper(srcPattern, obj, null, done);
    });
  });

  describe('extname', function() {
    it("includes '.' like Path.extname", function(done) {
      var srcPattern = 'test/fixtures/hello.txt';
      var obj = function(path) {
        path.extname.should.equal('.txt');
        path.extname.should.equal(Path.extname(srcPattern));
      };
      helper(srcPattern, obj, null, done);
    });

    it('excludes multiple extensions like Path.extname', function(done) {
      var srcPattern = 'test/fixtures/hello.min.txt';
      var obj = function(path) {
        path.extname.should.equal('.txt');
        path.extname.should.equal(Path.extname(srcPattern));
      };
      helper(srcPattern, obj, null, done);
    });
  });

  describe('multiExt option', function() {
    it('includes multiple extensions in extname', function(done) {
      var srcPattern = 'test/fixtures/hello.min.txt';
      var obj = function(path) {
        path.extname.should.equal('.min.txt');
        path.basename.should.equal('hello');
      };
      helper(srcPattern, obj, null, done, { multiExt: true });
    });
  });

  describe('original file context', function() {
    it('passed to plugin as second argument', function(done) {
      var srcPattern = 'test/fixtures/hello.min.txt';
      var obj = function(path, file) {
        file.should.be.instanceof(Object);
        file.should.be.ok();
      };
      helper(srcPattern, obj, null, done, { multiExt: true });
    });

    it('has expected properties', function(done) {
      var srcPattern = 'test/fixtures/hello.min.txt';
      var obj = function(path, file) {
        file.path.should.equal(Path.resolve(srcPattern));
        file.base.should.equal(Path.dirname(Path.resolve(srcPattern)));
        file.basename.should.equal(Path.basename(srcPattern));
        file.relative.should.equal(Path.basename(srcPattern));
        file.extname.should.equal(Path.extname(srcPattern));
      };
      helper(srcPattern, obj, null, done, { multiExt: true });
    });
  });
});

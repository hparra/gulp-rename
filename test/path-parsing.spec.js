/*global describe, context, it, helper */
"use strict";

require("./spec-helper");
var Path = require("path");

describe("gulp-rename path parsing", function () {
	describe("dirname", function () {
		context("when src pattern contains no globs", function () {
			it("dirname is '.'", function (done) {
				var srcPattern = "test/fixtures/hello.txt";
				var obj = function (path) {
					path.dirname.should.equal(".");
				};
				helper(srcPattern, obj, null, done);
			});
		});

		context("when src pattern contains filename glob", function () {
			it("dirname is '.'", function (done) {
				var srcPattern = "test/fixtures/*.min.txt";
				var obj = function (path) {
					path.dirname.should.equal(".");
				};
				helper(srcPattern, obj, null, done);
			});
		});

		context("when src pattern contains simple directory glob", function () {
			it("dirname is path from directory glob to file", function (done) {
				var srcPattern = "test/*/*.min.txt";
				var obj = function (path) {
					path.dirname.should.equal("fixtures");
				};
				helper(srcPattern, obj, null, done);
			});
		});

		context("when src pattern contains descendent directory glob", function () {
			it("dirname is path from directory glob to file", function (done) {
				var srcPattern = "test/**/*.min.txt";
				var obj = function (path) {
					path.dirname.should.equal("fixtures");
				};
				helper(srcPattern, obj, null, done);
			});
		});
	});

	describe("basename", function () {
		it("strips extension like Path.basename(path, ext)", function (done) {
			var srcPattern = "test/fixtures/hello.min.txt";
			var obj = function (path) {
				path.basename.should.equal("hello.min");
				path.basename.should.equal(Path.basename(srcPattern, Path.extname(srcPattern)));
			};
			helper(srcPattern, obj, null, done);
		});
	});

	describe("extname", function () {
		it("includes '.' like Path.extname", function (done) {
			var srcPattern = "test/fixtures/hello.txt";
			var obj = function (path) {
				path.extname.should.equal(".txt");
				path.extname.should.equal(Path.extname(srcPattern));
			};
			helper(srcPattern, obj, null, done);
		});

		it("excludes multiple extensions like Path.extname", function (done) {
			var srcPattern = "test/fixtures/hello.min.txt";
			var obj = function (path) {
				path.extname.should.equal(".txt");
				path.extname.should.equal(Path.extname(srcPattern));
			};
			helper(srcPattern, obj, null, done);
		});
	});
});

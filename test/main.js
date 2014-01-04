/*global describe, it*/
"use strict";

require("should");
require("mocha");

var path = require("path"),
	gulp = require("gulp"),
	rename = require("../");

describe("gulp-rename", function () {
	// string
	it("should rename file with a string", function (done) {

		var obj = "hola.md";

		var stream = gulp.src("./test/fixtures/hello.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			var expectedPath = path.resolve("test/fixtures/hola.md");
			String(file.base + file.relative).should.equal(expectedPath);
		});
		stream.on("end", function () {
			done();
		});
	});

	// function
	it("should rename file with a function", function (done) {

		var obj = function (dir, base, ext) {
			return base + "-hola" + ext;
		};

		var stream = gulp.src("./test/fixtures/hello.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			var expectedPath = path.resolve("test/fixtures/hello-hola.txt");
			String(file.base + file.relative).should.equal(expectedPath);
		});
		stream.on("end", function () {
			done();
		});
	});

	// hash
	it("should rename file with a hash/object", function (done) {

		var obj = {
			prefix: "bonjour-",
			suffix: "-hola",
			ext: ".md"
		};

		var stream = gulp.src("./test/fixtures/hello.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			var expectedPath = path.resolve("test/fixtures/bonjour-hello-hola.md");
			String(file.base + file.relative).should.equal(expectedPath);
		});
		stream.on("end", function () {
			done();
		});
	});

	// empty hash
	it("should not rename file with an empty hash/object", function (done) {

		var obj = {};

		var stream = gulp.src("./test/fixtures/hello.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			var expectedPath = path.resolve("test/fixtures/hello.txt");
			String(file.base + file.relative).should.equal(expectedPath);
		});
		stream.on("end", function () {
			done();
		});
	});

	// hello.min.txt
	it("should handle files with 'multiple extensions'", function (done) {

		var obj = {
			ext: ".min.md"
		};

		var stream = gulp.src("./test/fixtures/hello.min.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			var expectedPath = path.resolve("test/fixtures/hello.min.md");
			String(file.base + file.relative).should.equal(expectedPath);
		});
		stream.on("end", function () {
			done();
		});
	});

	//tricky hello.min.txt
	it("should complex rename of files with 'multiple extensions'", function (done) {

		var obj = {
			prefix: "bonjour-",
			suffix: "-hola",
			ext: ".min.md"
		};

		var stream = gulp.src("./test/fixtures/hello.min.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			var expectedPath = path.resolve("test/fixtures/bonjour-hello-hola.min.md");
			String(file.base + file.relative).should.equal(expectedPath);
		});
		stream.on("end", function () {
			done();
		});
	});

	// function arguments integrity (identity)
	it("should pass correct arguments to renaming function", function (done) {

	    var filePath = "test/fixtures/hello.min.txt";

	    var obj = function (dir, base, ext) {
			var resolvedDir = path.resolve(dir);
			var expectedDir = path.resolve("test/fixtures");
			resolvedDir.should.equal(expectedDir);
	        base.should.equal("hello.min");
	        ext.should.equal(".txt");

	        return base + ext;
	    };

	    var stream = gulp.src(filePath).pipe(rename(obj));

	    stream.on("error", done);
	    stream.on("data", function (file) {
	    	var expectedPath = path.resolve(filePath);
	        String(file.base + file.relative).should.equal(expectedPath);
	    });
	    stream.on("end", function () {
	        done();
	    });
	});
});

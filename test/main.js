/*global describe, it*/
"use strict";

require("should");
require("mocha");

var gulp = require("gulp"),
	rename = require("../");

describe("gulp-rename", function () {
	// string
	it("should rename file with a string", function (done) {

		var obj = "hola.md";

		var stream = gulp.src("./test/fixtures/hello.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			String(file.path).should.equal("test/fixtures/hola.md");
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
			String(file.path).should.equal("test/fixtures/hello-hola.txt");
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
			String(file.path).should.equal("test/fixtures/bonjour-hello-hola.md");
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
			String(file.path).should.equal("test/fixtures/hello.txt");
		});
		stream.on("end", function () {
			done();
		});
	});

	// hello.min.txt
	it("should handle files with 'multiple extensions'", function (done) {

		var obj = {
			ext: ".md"
		};

		var stream = gulp.src("./test/fixtures/hello.min.txt").pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			String(file.path).should.equal("test/fixtures/hello.min.md");
		});
		stream.on("end", function () {
			done();
		});
	});

	// WONTFIX:
	// tricky hello.min.txt
	// it("should complex rename of files with 'multiple extensions'", function (done) {

	// 	var obj = {
	// 		prefix: "bonjour-",
	// 		suffix: "-hola",
	// 		ext: ".md"
	// 	};

	// 	var stream = gulp.src("./test/fixtures/hello.min.txt").pipe(rename(obj));

	// 	stream.on("error", done);
	// 	stream.on("data", function (file) {
	// 		String(file.path).should.equal("test/fixtures/bonjour-hello-hola.min.md");
	// 	});
	// 	stream.on("end", function () {
	// 		done();
	// 	});
	// });
});

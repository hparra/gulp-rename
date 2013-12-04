/*global describe, it*/
"use strict";

require("should");
require("mocha");

var gulp = require("gulp"),
	rename = require("../");

describe("gulp-rename", function () {
	// string
	it("should rename file with a string", function (done) {

		var stream = gulp.src("./test/fixtures/hello.txt")
						.pipe(rename("hola.md"));

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

		var stream = gulp.src("./test/fixtures/hello.txt")
						.pipe(rename(function (dir, base, ext) {
							return base + "-hola" + ext;
						}));

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

		var stream = gulp.src("./test/fixtures/hello.txt")
						.pipe(rename(obj));

		stream.on("error", done);
		stream.on("data", function (file) {
			String(file.path).should.equal("test/fixtures/bonjour-hello-hola.md");
		});
		stream.on("end", function () {
			done();
		});
	});
});

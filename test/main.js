/*global describe, it*/
"use strict";

require("should");
require("mocha");

var gulp = require("gulp"),
	rename = require("../");

describe("gulp-rename", function () {
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
});

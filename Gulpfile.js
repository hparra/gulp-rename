"use strict";

var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	mocha = require("gulp-mocha");

// JSHint
// https://github.com/wearefractal/gulp-jshint
gulp.task("jshint", function () {
	return gulp.src(["./*.js", "test/**/*.js"])
		.pipe(jshint())
		.pipe(jshint.reporter("default"));
});

gulp.task("mocha", function () {
	return gulp.src("test/*.js", {read: false})
		.pipe(mocha());
});

// default task
gulp.task("default", ["jshint", "mocha"], function () {
	gulp.watch(["index.js", "./test/**"], ["jshint", "mocha"]);
});

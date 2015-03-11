var Stream = require("stream"),
	Path = require("path"),
	rename = require("rename");

function gulpRename(obj) {
	"use strict";

	var stream = new Stream.Transform({objectMode: true});

	stream._transform = function (file, unused, callback) {
		var path;
		try {
			path = rename(file.relative, obj);
		} catch (e) {
			return callback(e);
		}

		file.path = Path.join(file.base, path);

		callback(null, file);
	};

	return stream;
}

module.exports = gulpRename;


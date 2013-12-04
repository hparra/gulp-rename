var es = require("event-stream"),
	path = require("path");

module.exports = function (obj) {
	"use strict";

	function rename(file, callback) {

		if (!obj) {
			callback(new Error("No renamimg parameter supplied"), undefined);
		}

		// helper variables
		var dir = path.dirname(file.path);
			// ext = path.extname(file.path),
			// base = path.basename(file.path, ext);

		if (typeof obj === "string") {
			file.shortened = obj;
			file.path = path.join(dir, file.shortened);
		}

		callback(null, file);
	}

	return es.map(rename);
};

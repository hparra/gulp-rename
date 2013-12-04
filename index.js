var es = require("event-stream"),
	path = require("path");

module.exports = function (obj) {
	"use strict";

	function rename(file, callback) {

		if (!obj) {
			callback(new Error("No renaming parameter supplied"), undefined);
		}

		// helper variables
		var dir = path.dirname(file.path),
			ext = path.extname(file.path),
			base = path.basename(file.path, ext);

		if (typeof obj === "string") {

			file.shortened = obj;

		} else if (typeof obj === "function") {

			file.shortened = obj(dir, base, ext);

		} else if (typeof obj === "object") {

			var prefix = obj.prefix || "",
				suffix = obj.suffix || "",
				extension = obj.ext || ext;

			file.shortened = prefix + base + suffix + extension;

		} else {
			callback(new Error("Unsupported renaming parameter type supplied"), undefined);
		}

		file.path = path.join(dir, file.shortened);
		callback(null, file);
	}

	return es.map(rename);
};

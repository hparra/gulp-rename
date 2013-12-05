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
			ext = file.path.substr(file.path.indexOf(".", 1)),
			base = path.basename(file.path, ext),
			finalName = "";

		if (typeof obj === "string") {

			finalName = obj;

		} else if (typeof obj === "function") {

			finalName = obj(dir, base, ext);

		} else if (typeof obj === "object") {

			var prefix = obj.prefix || "",
				suffix = obj.suffix || "",
				extension = obj.ext || ext;

			finalName = prefix + base + suffix + extension;

		} else {
			callback(new Error("Unsupported renaming parameter type supplied"), undefined);
		}

		file.path = path.join(dir, finalName);
		callback(null, file);
	}

	return es.map(rename);
};

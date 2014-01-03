var map = require("map-stream"),
	path = require("path");

module.exports = function (obj) {
	"use strict";

	function rename(file, callback) {

		if (!obj) {
			callback(new Error("No renaming parameter supplied"), undefined);
		}

		// helper variables
		var relativePath = path.relative(file.cwd, file.path),
			dir = path.dirname(relativePath),
			firstname = file.path.substr(file.path.indexOf(".", 1)),
			ext = file.path.substr(file.path.lastIndexOf(".")),
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

			finalName = prefix + path.basename(file.path, firstname) + suffix + extension;

		} else {
			callback(new Error("Unsupported renaming parameter type supplied"), undefined);
		}

		file.path = path.join(dir, finalName);
		callback(null, file);
	}

	return map(rename);
};

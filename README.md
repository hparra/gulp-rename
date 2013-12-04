# gulp-rename

gulp-rename is a [gulp](https://github.com/wearefractal/gulp) plugin to rename files easily.

## Usage

gulp-rename provides simple file renaming methods.

```javascript
var rename = require("gulp-rename");

// rename via string
gulp.src("./src/hello.txt")
	.pipe(rename("goodbye.txt"))
	.pipe(gulp.dest("./dist"));

// rename via function
gulp.src("./src/hello.txt")
	.pipe(rename(function (dir, base, ext) {
		return base + "-goodbye" + ext;
	}))
	.pipe(gulp.dest("./dist")); // ./dist/hello-goodbye.txt

// rename via hash
gulp.src("./src/hello.txt")
	.pipe(rename({
		prefix: "bonjour-",
		suffix: "-hola",
		ext: ".md"
	}))
	.pipe(gulp.dest("./dist")); // ./dist/bonjour-hello-hola.md
```

## Notes

`ext` follows the node convention in that it includes the period.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

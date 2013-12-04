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
```

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

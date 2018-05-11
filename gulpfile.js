var gulp = require( 'gulp' ),
		path = require('path'),
		sass = require( 'gulp-sass' ),
		autoprefixer = require( 'gulp-autoprefixer' ),
		combineMq = require( 'gulp-combine-mq' ),
		cssmin = require( 'gulp-cssnano' ),
		notify = require( 'gulp-notify' ),
		watch = require( 'gulp-watch' ),
		autoprefixer_browsers = ['last 2 versions', 'ie 9', 'ios 6', 'android 4'];

gulp.task('sass', function () {
	return gulp.src('./sass/**/*.scss')
		.pipe( sass.sync().on('error', sass.logError) )
		.pipe( autoprefixer( autoprefixer_browsers ) )
		.pipe( combineMq() )
		.pipe( cssmin() )
		.pipe( gulp.dest('.') )
		.pipe( notify( {
			message: 'TASK: "sass" Completed!',
			onLast : true
		} ) );
});
 
gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task( 'default', ['watch'] );
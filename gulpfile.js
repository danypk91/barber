var elixir = require('laravel-elixir'),
    uglify	= require('gulp-uglify'),
    concat	= require('gulp-concat'),
    minify	= require('gulp-clean-css'),
    gulp 	= require('gulp');

//Display error messages
function errorLog(error)
{
    console.error.bind(error);
    this.emit('end');
}
/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.less('app.less');
});

//scriptLibs Task
//Concat and uglify script libraries
gulp.task('scriptLibs', function(){
    gulp.src([
        'public/js/jquery/jquery-1.11.3.min.js',
        'public/js/popper.min.js',
        'public/js/plugins.js',
        'public/js/main.js',
        'public/js/lib/data-table/datatables.min.js',
        'public/js/lib/data-table/dataTables.bootstrap.min.js',
        'public/js/lib/data-table/dataTables.buttons.min.js',
        'public/js/lib/data-table/datatables-init.js',
        'public/js/jquery/jquery.blockUI.min.js',
        'public/js/jquery/jquery-ui_1.12.1.js',
        'public/js/bootstrap-dialog.min.js',

    ])
        .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('public/js'));
});

//cssLibs Task
//concat and uglify css libraries
gulp.task('cssLibs', function(){
    gulp.src([
        "public/css/normalize.css",
        "public/css/font-awesome.min.css",
        "public/css/themify-icons.css",
        "public/css/flag-icon.min.css",
        "public/css/cs-skin-elastic.css",
        "public/css/bootstrap.css",
        "public/scss/style.css",
        "public/css/lib/vector-map/jqvmap.min.css",
        "public/css/jquery-ui-1.10.0.custom.css",
    ])
        .on('error', errorLog)
        .pipe(minify())
        .on('error', errorLog)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('public/css'));

});

gulp.task('default', ['scriptLibs','cssLibs']);

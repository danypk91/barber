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
/*gulp.task('scriptLibs', function(){
    gulp.src([
        'public/js/jquery-1.10.2.min.js',
        'public/js/jquery-ui-1.9.2.custom.min.js',
        'public/js/jquery-migrate-1.2.1.min.js',
        'public/js/toastr.min.js',
        'public/js/jquery.mark.min.js',
        'public/js/datatables/js/jquery.dataTables.js',
        'public/js/chosen.jquery.min.js',
        'public/js/datatables/js/dataTables.bootstrap.js',
        'public/js/jquery.blockUI.min.js',
        'public/js/jquery.contextMenu.min.js',
        'public/js/bootstrap-select.min.js',
        'public/js/bootstrap-tagsinput/bootstrap-tagsinput.js',
        'public/js/bootstrap3-typeahead.min.js',
        'public/js/bootstrap-wysihtml5/wysihtml5-0.3.0.js',
        'public/js/bootstrap-wysihtml5/bootstrap-wysihtml5.js',
        'public/js/moment.min.js',
        'public/js/moment.it.js',
        'public/js/socket.io-1.2.0.js',
        'public/js/bootstrap.min.js',
        'public/js/bootstrap-dialog.min.js',
        'public/js/autosize.js',
        'public/js/global.settings.js',

    ])
        .pipe(uglify())
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('public/js'));
});
*/
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

gulp.task('default', ['cssLibs']);

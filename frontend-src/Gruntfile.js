module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                files: {
                    '../frontend/main.min.js': [
                        /** ============ jquery fix ============ */
                        'js/before-scripts.js',
                        /* user interface layout */
                        '3rdparty/jquery/jquery.js',
                        '3rdparty/jquery/jquery-ui.js',
                        '3rdparty/jquery/jquery.layout.js',
                        /* my sources */
                        'js/utils.js',
                        'js/yaksha_mo.js',
                        'js/main.js',
                        /** ============ jquery fix ============ */
                        'js/after-scripts.js',
                    ]
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: true,
                roundingPrecision: -1
            },
            target: {
                files: {
                    '../frontend/main.min.css': [
                        '3rdparty/jquery/layout-default.css',
                        'css/main.css'
                    ],
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.registerTask('default', ['uglify:build', 'cssmin']);
};
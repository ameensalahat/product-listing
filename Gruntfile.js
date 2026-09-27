 module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({

        sass: {
            dist: {
                options: {
                    implementation: require('sass')
                },
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            }
        }

    });

    grunt.registerTask('default', ['sass']);

};
 
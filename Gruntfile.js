module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    connect: {
      server: {
        options: {
          port: 9000,
          hostname: 'localhost'
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/js/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    watch: {
      scripts: {
        files: ['js/**/*.js, css/*.css'],
        tasks: ['default'],
        options: {
          livereload:true
        },
      },
    },

  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['connect', 'jshint', 'watch']);
};
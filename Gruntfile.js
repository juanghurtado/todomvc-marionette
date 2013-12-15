module.exports = function(grunt) {
  /* =DEPENDENCIES
  --------------------------------------------------------------------------- */
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

  /* =CONFIG
  --------------------------------------------------------------------------- */
  grunt.initConfig({
    clean : ['./app/js/main.min.js', './app/css/main.min.css', './app/css/main.css'],
    connect: {
      server: {
        options : {
          port: 8888,
          base: '.'
        }
      }
    },
    exec: {
      jasmine: {
        command: 'phantomjs test/lib/run-jasmine.js http://localhost:8888/test',
        stdout: true
      }
    },
    coffee : {
      app: {
        expand: true,
        cwd: './app/js',
        src: ['**/*.coffee'],
        dest: './app/js',
        ext: '.js'
      },

      test: {
        expand: true,
        cwd: './test',
        src: ['**/*.coffee'],
        dest: './test/',
        ext: '.js'
      },
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './app/js',
          mainConfigFile: './app/js/main.js',
          out: './app/js/main.min.js',
          include: 'main',
          uglify: {
            toplevel: true,
            ascii_only: true,
            beautify: false,
            max_line_length: 1000
          },
          preserveLicenseComments: false
        }
      }
    },
    less: {
      development: {
        files: {
          './app/css/main.css': './app/css/less/main.less'
        }
      },
      production: {
        options: {
          yuicompress: true
        },
        files: {
          './app/css/main.min.css': './app/css/less/main.less'
        }
      },
    },
    watch: {
      coffee : {
        files: './app/js/**/*.coffee',
        tasks: ['coffee:app']
      },
      less: {
        files: './app/css/less/**/*',
        tasks: ['less']
      },
      test: {
        files: './test/specs/**/*.coffee',
        tasks: ['coffee:test', 'exec:jasmine']
      }
    }
  });

  /* =TASKS
  --------------------------------------------------------------------------- */
  grunt.registerTask('default', ['coffee:app', 'less:development']);
  grunt.registerTask('test', ['coffee:test', 'connect', 'exec:jasmine']);
  grunt.registerTask('listen', ['connect', 'watch']);
  grunt.registerTask('build', ['clean', 'connect', 'exec:jasmine', 'requirejs', 'less']);
};
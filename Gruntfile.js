module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    dirs: {
      src: 'src',
      dest: 'dist',
      bower: 'bower_components'
    },

    bump: {
      options: {
        files: ['package.json','bower.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json','bower.json'],
        createTag: false,
        tagName: 'v%VERSION%',
        tagMessage: 'v%VERSION%',
        push: false,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    },

    // Run JS through JSHint
    jshint: {
      options: {
        sub: true,
        asi: true,
        loopfunc: true,
        expr: true
      },
      all: [
        'Gruntfile.js',
        '<%= dirs.src %>/**/*.js',
        '!node_modules/**/*.js',
        '!<%= dirs.bower %>/**/*.js',
        '!**/vendor/*.js'
      ]
    },

    // Concatenate
    concat: {
      options: {
        stripBanners: true,
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        separator: ';'
      },
      dist: {
        src: [
          '<%= dirs.src %>/assets/js/**.js',
          '!**/*.min.js',
          '!<%= dirs.src %>/assets/js/vendor/**.js'
        ],
        dest: '<%= dirs.dest %>/assets/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
      }
    },

    // Uglify JS
    uglify: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= dirs.dest %>/assets/js/<%= pkg.name %>.<%= pkg.version %>.min.js',
        dest: '<%= dirs.dest %>/assets/js/<%= pkg.name %>.<%= pkg.version %>.min.js'
      }
    },

    // SASS CSS Preprocessor
    sass: {
      options: {
        //  sourceMap: true
      },
      files: {
        expand: true,
        cwd: "<%= dirs.src %>/assets/scss",
        src: "raptorlink.scss",
        dest: "<%= dirs.src %>/assets/css",
        ext: ".css"
      }
    },


    // Lint CSS
    csslint: {
      lax: {
        options: {
          "import": 2,
          "empty-rules": 2,
          "duplicate-properties": 2,
          "box-sizing": false,
          "box-model": false,
          "regex-selectors": false,
          "unique-headings": false,
          "floats": false,
          "font-faces": false,
          "font-sizes": false,
          "qualified-headings": false,
          "adjoining-classes": false,
          "overqualified-elements": false,
          "zero-units": false
        },
        src: [
          '<%= dirs.src %>/assets/css/**/*.css',
          '!**/*font-awesome.min.css',
          '!<%= dirs.src %>/assets/css/vendor/**.css'
        ]
      }
    },

  //  CSS Comb
    csscomb: {
      dynamic_mappings: {
          expand: true,
          cwd: '<%= dirs.src %>/assets/css/',
          src: ['*.css', '!*.resorted.css'],
          dest: '<%= dirs.src %>/assets/css/',
          ext: '.resorted.css'
      }
    },

    // Minify CSS
    cssmin: {

      combine: {
        files: [{
          expand: true,
          cwd: '<%= dirs.src %>/assets/css/',
          src: ['*.resorted.css', '*.min.css'],
          dest: '<%= dirs.dest %>/assets/css/',
          ext: '.min.css'
        }]
      },

      minify: {
        files: [{
          expand: true,
          cwd: '<%= dirs.src %>/assets/css/',
          src: ['*.css', '!font-awesome.min.css'],
          dest: '<%= dirs.dest %>/assets/css/',
          ext: '.min.css'
        }]
      }

    },

    // Copy files that need no processing from SRC to DIST
    copy: {
      main: {
        files: [
          {
            expand: true,
            src: '<%= dirs.src %>/assets/js/*.min.js',
            dest: '<%= dirs.dest %>/assets/js/',
            filter: 'isFile',
            flatten: true
          },
          {
            expand: true,
            src: '<%= dirs.src %>/assets/js/vendor/*.js',
            dest: '<%= dirs.dest %>/assets/js/vendor/',
            filter: 'isFile',
            flatten: true
          },
          {
            expand: true,
            src: '<%= dirs.src %>/assets/css/vendor/*.css',
            dest: '<%= dirs.dest %>/assets/css/vendor/',
            filter: 'isFile',
            flatten: true
          },
          {
            expand: true,
            cwd: '<%= dirs.src %>/assets/img/',
            src: '**',
            dest: '<%= dirs.dest %>/assets/img/',
            filter: 'isFile',
            flatten: false
          },
          {
            expand: true,
            cwd: '<%= dirs.src %>/assets/data/',
            src: '**',
            dest: '<%= dirs.dest %>/assets/data/',
            filter: 'isFile',
            flatten: false
          },
          {
            expand: true,
            cwd: '<%= dirs.src %>/assets/fonts/',
            src: '**',
            dest: '<%= dirs.dest %>/assets/fonts/',
            filter: 'isFile',
            flatten: false
          },
          {
            expand: true,
            cwd: '<%= dirs.src %>/assets/conf/',
            src: '**',
            dest: '<%= dirs.dest %>/assets/conf/',
            filter: 'isFile',
            flatten: false
          },
          {
            expand: true,
            cwd: '<%= dirs.src %>/',
            src: '*.config',
            dest: '<%= dirs.dest %>/',
            filter: 'isFile',
            flatten: false
          }
        ]
      },
    },

    // Wire up include capabilities
    simple_include: {
      options: {
        'includeRegex':"<!--.*?include:.*?([a-zA-Z0-9_@/.-]+).*?\'?(.*?)-->"
      },
      your_target: {
        src: ['src/*.html'],
        dest: 'dist'
      },
    },

    // Concatenate Bower Components
    bower_concat: {
      all: {
        dest: '<%= dirs.dest %>/assets/js/vendor/_bower.js',
        cssDest: '<%= dirs.dest %>/assets/css/vendor/_bower.css',
        mainFiles: {
          'jquery': 'dist/jquery.min.js',
          'sortable': 'js/sortable.min.js',
          'bootstrap': ['dist/js/bootstrap.min.js','dist/css/bootstrap.min.css','dist/css/bootstrap-theme.min']
        }
      }
    },

    // Setup asset injection capabilities
    injector: {
      options: {
        "addRootSlash": false,
        "ignorePath": "<%= dirs.dest %>/"
      },
      local_dependencies: {
        files: {
          '<%= dirs.dest %>/index.html':
            [
              '<%= dirs.dest %>/assets/js/vendor/**/*.js',
              '<%= dirs.dest %>/assets/js/**/*.js',
              '<%= dirs.dest %>/assets/css/vendor/*.css',
              '<%= dirs.dest %>/assets/css/**/*.css'
            ],
          '<%= dirs.dest %>/imdb.html':
            [
              '<%= dirs.dest %>/assets/js/vendor/**/*.js',
              '<%= dirs.dest %>/assets/js/**/*.js',
              '<%= dirs.dest %>/assets/css/vendor/*.css',
              '<%= dirs.dest %>/assets/css/**/*.css'
            ]
        }
      }
    },

    // Configure variable replacement
    replace: {
      dist: {
        options: {
          patterns: [
            {match: 'version', replacement: '<%= pkg.version %>'},
            {match: 'timestamp', replacement: '<%= grunt.template.today() %>'},
            {match: 'name', replacement: '<%= pkg.name %>'},
            {match: 'title', replacement: '<%= pkg.title %>'},
            {match: 'description', replacement: '<%= pkg.description %>'},
            {match: 'keywords', replacement: '<%= pkg.keywords %>'},
            {match: 'ogtype', replacement: '<%= pkg.ogtype %>'},
            {match: 'ogurl', replacement: '<%= pkg.ogurl %>'},
            {match: 'ogimage', replacement: '<%= pkg.ogimage %>'},
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['dist/**/*.html'], dest: 'dist/'}
        ]
      }
    },

    // Clean up files that are written with version numbers
    clean: {
      js: ["<%= dirs.dest %>/assets/js/**/*js"],
      css: ["<%= dirs.dest %>/assets/css/**/*.css","!<%= dirs.dest %>/assets/css/_bower.css"]
    },

    // Configure Grunt Watch
    watch: {
      scripts: {
        files: ['src/**/*.js','src/**/*.json'],
        tasks: ['clean:js','copy','jshint','bump:prerelease','concat','uglify','bower_concat','simple_include','injector','replace','htmlclean'],
        options: {
          spawn: false
        }
      },
      styles: {
        files: ['src/**/*.scss','src/**/*.css'],
        tasks: ['clean:css','copy','sass','csslint','cssmin','bump:prerelease','bower_concat','simple_include','injector','replace','htmlclean'],
        options: {
          spawn: false
        }
      },
      markup: {
        files: ['src/**/*.html'],
        tasks: ['copy','bump:prerelease','bower_concat','simple_include','injector','replace','htmlclean'],
        options: {
          spawn: false
        }
      }
    },

    // Strip comments from generated content
    htmlclean: {
      deploy: {
        expand: true,
        cwd: '<%= dirs.dest %>',
        src: '*.html',
        dest: '<%= dirs.dest %>/'
      }
    },

  });

  // Process Grunt Tasks
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-contrib-jshint');   // Load the JSHint task
  grunt.loadNpmTasks('grunt-contrib-concat');   // Load the Concat JS task
  grunt.loadNpmTasks('grunt-contrib-uglify');   // Load the UglifyJS task
  grunt.loadNpmTasks('grunt-contrib-sass');     // Load the SASS task
  grunt.loadNpmTasks('grunt-contrib-csslint');  // Load the CSS Lint task
//  grunt.loadNpmTasks('grunt-csscomb');          // Load the CSS Comb task
  grunt.loadNpmTasks('grunt-contrib-cssmin');   // Load the CSS minifier task
  grunt.loadNpmTasks('grunt-contrib-copy');     // Load the File Copy task
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-asset-injector');   // Load the Asset Injector plugin
  grunt.loadNpmTasks('grunt-simple-include');   // Load the Includes plugin
  grunt.loadNpmTasks('grunt-replace');          // Load the Replace plugin
  grunt.loadNpmTasks('grunt-contrib-watch');    // Load the Grunt watch plugin
  grunt.loadNpmTasks('grunt-contrib-clean');    // Cleans the target (dist) directory on build
  grunt.loadNpmTasks('grunt-htmlclean');        // Cleans the target HTML content

  // Execute tasks
  grunt.registerTask('default', [
    'clean',
    'jshint',
    'concat',
    'uglify',
    'sass',
    'csslint',
    'cssmin',
    'bump',
    'bower_concat',
    'copy',
    'simple_include',
    'injector',
    'replace',
    'htmlclean'
  ]);

};

module.exports = function(grunt){

  var pkg = grunt.file.readJSON('package.json');
  require('time-grunt')(grunt); //Outputs a time report to console after any operations have run

	grunt.initConfig({
		pkg: pkg,
		copy:{
			build_wordpress:{
				files:[{
					cwd: 'bower_components/wordpress/',
					src: ['**'],
					dest: 'build/',
					nonull: false,
					expand: true,
					flatten: false,
					filter: 'isFile',
				}]
			},
			build_theme:{
				files:[{
					cwd: 'src/',
					src: ['**', '!*/*scss', '!*.rb', '!*/*.css', '!*/*.js', '!*/**.{png,jpg,gif}'],
					dest: 'build/wp-content/themes/<%= pkg.name %>',
					nonull: false,
					expand: true,
					flatten: false,
					filter: 'isFile',
				}]
			},
			build_plugins:{
				files:[{
					cwd: 'bower_components/',
					src: [
						'ninja-forms/**',
						'wp-maintenance-mode/**'
					],
					dest: 'build/wp-content/plugins/',
					nonull: false,
					expand: true,
					flatten: false,
					filter: 'isFile',
				}]
			},
      wordpres_toplevel: {
        files: [{
          cwd: 'wordpress/',
          src: [
            'BingSiteAuth.xml',
            'favicon.ico',
            'google7389dbcbf91df492.html'
          ],
          dest: 'build/',
          nonull: false,
          expand: true,
          flatten: false,
          filter: 'isFile',
        }]
      }
		},
		watch: {
			options: {
			  livereload: true,
			},
			js:{
				files: ['src/**/*.js'],
				tasks: ['uglify']
			},
			css:{
				files: ['src/css/*.css'],
				tasks: ['cssmin']
			},
			compass:{
				files: ['src/sass/*.scss'],
				tasks: ['compass:new']
			},
      for_less:{
        files: "src/less/**/*.less",
        tasks: ['less', 'newer:cssmin']
      }
			copy:{
				files: ['src/**/**.php','src/**/**.{png,jpg,gif}'],
				tasks: ['copy:build_theme']
			}
		},
    uglify:{
			options:{
				banner: '/*<%= pkg.name %> V<%= pkg.version %> made on <%= grunt.template.today("yyyy-mm-dd") %>*/\r',
				mangle: true
			},
			target:{
				files:{
					'build/wp-content/themes/<%= pkg.name %>/js/scripts.js': [
						'src/js/jquery.masonry.min.js',
            'src/js/functions.js'
						]
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'src/css/',
				src: ['**/*.css'],
				dest: 'build/wp-content/themes/<%= pkg.name %>/css',
				ext: '.css',
			}
		},
    imagemin:{
			dynamic:{
				files: [{
					expand: true,
					cwd: 'src/img/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'build/wp-content/themes/<%= pkg.name %>/img/',
				}]
			}
		},
    less: {
      live: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'style.css.map',
          sourceMapFilename: '<%= pkg.build_location %>/css/style.css.map'
        },
        src: 'src/less/style.less',
        dest: '<%= pkg.build_location %>/css/style.css'
      }
    },
		compass: {
      new:{
        options:{
          sassDir: 'src/sass',
          cssDir: 'build/wp-content/themes/<%= pkg.name %>/css',
          imagesPath: 'src/img',
          javascriptsPath: 'src/js',
          fontsPath: 'src/fonts',
          outputStyle: 'compressed',
          environment: 'production'
        }
      }
		},
    clean: {
			tidy: {
				src: [
					"build/*.{php,html,txt}",
					"!build/wp-config.php",
					"!build/.htaccess",
					"build/wp-admin/**",
					"build/wp-includes/**",
					"build/wp-content/themes/**",
					"build/wp-content/plugins/**"
				]
			},
			setup: {
				src: [
					"build/*.{html,txt}",
					"build/wp-config-sample.php"
				]
			}
		}
	});

	// Load the grunt plugins we'll need
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	 grunt.loadNpmTasks('grunt-contrib-compass'); // remove please
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-newer');

	// Default task(s).
	grunt.registerTask('build', [
    'newer:copy:build_wordpress',
    'newer:copy:build_theme',
    'newer:copy:build_plugins',
    'newer:cssmin',
    'newer:uglify',
    'newer:imagemin',
    'compass:new'
  ]);

	grunt.registerTask("update", [
    'newer:copy:build_theme',
    'newer:cssmin',
    'newer:uglify',
    'newer:imagemin',
    'compass:new'
  ]);

	grunt.registerTask("default", ['watch']);

  grunt.registerTask("plugins", ['newer:copy:build_plugins','newer:copy:paid_plugins']);

  grunt.registerTask("tidy", ['clean:tidy']);

};

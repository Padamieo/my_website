module.exports = function(grunt){

	//keeping as example of mac specifics
	if (process.platform === "darwin") {
		password = "--dbpass=root";
	} else {
		password = "";
	}
	var use_pass = password;

	var theme_folder = 'my_awesome_theme'; // name of your theme here

    var pkg = grunt.file.readJSON('package.json');
    require('time-grunt')(grunt); //Outputs a time report to console after any operations have run

	grunt.initConfig({
		pkg: pkg,
		copy:{
			live:{
				files:[
					{
					cwd: 'src/',
					src: ['**', '!*/*.css', '!*/*.js'],
					dest: 'build/wp-content/themes/'+theme_folder+'/',
					nonull: false,
					expand: true,
					flatten: false,
					filter: 'isFile',
					}
				]
			},
			build_wordpress:{
				files:[
					{
					cwd: 'bower_components/wordpress/',
					src: ['**'],
					dest: 'build/',
					nonull: false,
					expand: true,
					flatten: false,
					filter: 'isFile',
					}
				]
			},
			build_theme:{
				files:[
					{
					cwd: 'src/',
					src: ['**', '!*/*scss', '!*.rb'],
					dest: 'build/wp-content/themes/'+theme_folder+'',
					nonull: false,
					expand: true,
					flatten: false,
					filter: 'isFile',
					}
				]
			},
			build_plugins:{
				files:[
					{
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
					}
				]
			},
			move_required:{
				files:[
 					{
						cwd: 'wordpress/',
						src: ['wp-cli.phar'],
						dest: 'build/',
						nonull: false,
						expand: true,
						flatten: false,
						filter: 'isFile',
					}
				]
			}
		},
		shell: {
			createdb: {
				command: 'mysqladmin -h localhost -uroot -p"" create database_<%= grunt.template.today("yyyymmdd") %>'
			},
			createconfig: {
				command: [

				'cd ./build',
				'php wp-cli.phar core config --dbname=database_<%= grunt.template.today("yyyymmdd") %> --dbuser=root '+ use_pass +' --dbhost=localhost'

				].join('&&')
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
				tasks: ['compass:live']
			},
			copy:{
				files: ['src/**/**.php','src/**/**.{png,jpg,gif}'],
				tasks: ['copy:live']
			}
		},
		uglify:{
			options:{
				banner: '/*<%= pkg.name %> V<%= pkg.version %> made on <%= grunt.template.today("yyyy-mm-dd") %>*/\r'
			},
			my_target: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: '**/*.js',
					dest: 'build/wp-content/themes/'+theme_folder+'/',
				}]
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'src/css/',
				src: ['**/*.css'],
				dest: 'build/wp-content/themes/'+theme_folder+'/css',
				ext: '.css',
			}
		},
		compass: {
			live:{
				options: {
					config: 'config_live.rb'
				}
			}
		}
	});

	// Load the grunt plugins we'll need for minification, uglification, etc.
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-shell');

	// Default task(s).
	grunt.registerTask('build', ['newer:copy:build_wordpress','newer:copy:build_theme','newer:copy:build_plugins']);
	grunt.registerTask('wp-config', ['newer:copy:move_required','shell:createdb','shell:createconfig']);
	grunt.registerTask("update", ['copy:live','newer:cssmin','newer:uglify','compass:live']);
	grunt.registerTask("default", ['watch']);
	
};

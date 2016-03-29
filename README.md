# my_website nothingisstillsomething.co.uk
my website using grunt_wp_themer as an example

####System Requirments

The following is required on your system to build and develop:

* Depending on OS (Operating System) Apache, Mysql and PHP.
  * MAMP : [MAC](https://www.mamp.info/en/)
  * LAMP : [LINUX](https://en.wikipedia.org/wiki/LAMP_(software_bundle))
  * WAMP : [WINDOWS](http://www.wampserver.com/en/)
* SVN (Subversion) : [TortoiseSVN](http://tortoisesvn.net/)
* node.js : [nodejs](http://nodejs.org)
* grunt.js : [gruntjs](http://gruntjs.com)
* bower.js : [bowerjs](http://bower.io)
* [Chrome](http://www.google.com/chrome/) or similiar modern browser.

###On initial repository download

Run the following commands from the repo's root directory:

1. npm install
2. bower install
3. grunt build

###Other Avaliable Grunt commands

* grunt watch
  * watches the src folder for changes, updates the build folder as necessary so your local site is always running your last changes.
* grunt build
  * creates the build folder, giving you a local wordpress folder setup with plugins and theme.
* grunt update
  * Updates the build folder with every static resource change (so images, css, js, etc)
* grunt plugins
  * copies plugins into the build folder "wordpress" location.
* grunt tidy
	* removes the build folder and content, except wp-config.php and uploads.

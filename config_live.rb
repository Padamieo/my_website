# this is the production deployment config for grunt sass compass output
#http://www.gayadesign.com/diy/how-to-start-using-sass-and-compass-in-10-minutes/

#Folder settings
css_dir = "build/wp-content/themes/name_of_awesome_theme/css"
sass_dir = "src/sass"
images_dir = "src/img"
javascripts_dir = "src/js"
fonts_dir = "src/fonts"

# You can select your preferred output style here (can be overridden via the command line):
output_style = :compressed
environment = :production

# To disable debugging comments that display the original location of your selectors. Uncomment:
line_comments = false

# Obviously
preferred_syntax = :scss
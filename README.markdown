# Backbone.Marionette Boilerplate

This is a boilerplate project to build stuff using [Backbone.Marionette](http://marionettejs.com "Marionette.js – A scalable and composite application architecture for Backbone.js"). Some other funny names involved are: [Require.js](http://requirejs.org "RequireJS"), [Bower](http://twitter.github.com/bower/ "BOWER"), [Jasmine](http://pivotal.github.com/jasmine/ "introduction.js"), [Grunt.js](http://gruntjs.com "grunt: a task-based command line build tool for JavaScript projects"), [LESS](http://lesscss.org "LESS &laquo; The Dynamic Stylesheet language").

## Dependencies

* JS dependencies are managed using [Bower](http://twitter.github.com/bower/ "BOWER"). To install all dependencies use: `bower install`
* You can install Node.js dependecies using: `npm install`
* [PhantomJS](http://phantomjs.org "PhantomJS: Headless WebKit with JavaScript API"). On OSX You can do it using Homebrew: `brew install phantomjs`

## Grunt.js tasks

* `default`: Compiles all LESS files under `/app/css/less/` to `/app/css/main.css`
* `test`: Executes all Jasmine tests
* `listen`: Watches changes in LESS files and Jasmine spec files to re-compile or re-run them
* `build`: Runs tests, prepares a production JS file to `/app/js/main.min.js`, compiles LESS files for production to `/app/css/main.min.css` and optimizes images under `/app/images/`
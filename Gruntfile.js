/*
 * grunt-github-markdown
 * https://github.com/wtfsven/grunt-github-markdown
 *
 * Copyright (c) 2015 Stephen Collins
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/test.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['test/tmp']
    },

    // Configuration to be run (and then tested).
    githubMarkdown: {
      default: {
        options: {

        },
        files: [{
					expand: true,
					src: ['test/tmp/*.md'],
					dest: '.',
					ext: '.html'
				}]
      },
			customTmpl: {
        options: {
					template: 'test/fixtures/custom-template.html'
        },
        files: [{
					expand: true,
					src: ['test/tmp/*.md'],
					dest: '.',
					ext: '.html'
				}]
      }
    },

    // Unit tests.
    mochaTest: {
			src: ['test/test.js'],
			options: {
				bail: true
			}
		}

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

	// Setup a test helper to create some folders to clean.
	grunt.registerTask('copy', 'Copy fixtures to a temp location.', function () {
		grunt.file.copy('test/fixtures/index.md', 'test/tmp/index.md');
		grunt.file.copy('test/fixtures/custom-template.html', 'test/tmp/custom-template.html');
	});

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'copy', 'githubMarkdown:default', 'mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

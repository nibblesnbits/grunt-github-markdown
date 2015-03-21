/*
 * grunt-github-markdown
 * https://github.com/wtfsven/grunt-github-markdown
 *
 * Copyright (c) 2015 Stephen Collins
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');
var marked = require('marked');
var doT = require('dot');
var path = require('path');

module.exports = function (grunt) {

	grunt.registerMultiTask('githubMarkdown', 'Performing jsontl transformations', function () {

		var content,
				createdFiles = 0,
				markedOptions = {
					renderer: new marked.Renderer(),
					gfm: true,
					tables: true,
					breaks: false,
					pedantic: false,
					sanitize: true,
					smartLists: true,
					smartypants: false
				};

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			template: path.join(__dirname, 'template.html'),
			markedOptions: markedOptions
		});

		marked.setOptions(options.markedOptions);


		// Transform specified files.
		this.files.forEach(function (f) {
			var src = f.src.filter(function (filepath) {
				// Warn on and remove invalid source files
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' not found.');
					return false;
				} else {
					return true;
				}
			});

			if (src.length === 0) {
				grunt.log.warn('Destination ' + chalk.cyan(f.dest) + ' not written because src files were empty.');
				return;
			}

			grunt.verbose.writeln('Loading template at ' + options.template);
			var template = doT.template(grunt.file.read(options.template));

			try {
				grunt.verbose.writeln('Processing file at ' + chalk.cyan(src));

				var md = grunt.file.read(src);
				content = template({
					content: marked(md)
				});

				grunt.verbose.writeln('Executing conversion...');

			} catch (e) {
				console.log(e);
				var err = new Error('Transform failed.');
				if (e.message) {
					err.message += '\n' + e.message + '. \n';
					if (e.line) {
						err.message += 'Line ' + e.line + ' in ' + src + '\n';
					}
				}
				err.origError = e;
				grunt.log.warn('Conversion of source ' + chalk.cyan(src) + ' failed.');
				grunt.fail.warn(err);
			}

			// write html file
			grunt.file.write(f.dest, content);

			grunt.verbose.writeln('File ' + chalk.cyan(f.dest) + ' created');
			createdFiles++;
		});
		grunt.log.ok(this.filesSrc.length + ' ' + grunt.util.pluralize(this.filesSrc.length, 'file/files') + ' created.');
	});
};

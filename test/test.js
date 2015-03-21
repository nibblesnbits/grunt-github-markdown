/* jshint mocha: true */

var assert = require('assert');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

describe('Task', function () {
	var $;
	before(function (done) {

		fs.readFile(path.join(__dirname, 'tmp/index.html'), function (err, data) {
			if (err) {
				assert.ifError(err, 'Error retrieving file: ' + err);
				done();
			}

			$ = cheerio.load(data);

			assert($, 'File not created');

			done();
		});
	});

	it('should have performed conversion', function () {
		assert.equal($('#javascript').length, 1, 'Cannot find #javascript element');
	});
});

# grunt-github-markdown

> Grunt plugin for github-flavored markdown

## Getting Started
This plugin requires Grunt `>=0.4.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-github-markdown --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-github-markdown');
```

## The "githubMarkdown" task

### Overview
In your project's Gruntfile, add a section named `github_markdown` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  github_markdown: {
    options: {
      // options go here
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  }
})
```

### Options

#### template

A path to a custom template (`.html`) file.

grunt-github-markdown uses [doT](http://olado.github.io/doT/) for templating, but all you need to know is that in a custom template, `{{=it.content}}` is replaced with the output html.

#### markedOptions

An object to pass to the [marked library](https://github.com/chjj/marked#usage). 

### Usage Example

```js
grunt.initConfig({
  github_markdown: {
    options: {
      markedOptions: {
        smartyPants: false
      }
    },
    files: {
      'dest/folder': ['src/index.md'],
    },
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Licensed under the MIT license.

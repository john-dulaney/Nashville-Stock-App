module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      scripts: {
        files: ["**/app/**/*.js", "**/styles/**/*.css", "index.html"],
        tasks: ["eslint"],
        options: {
          spawn: false,
        },
      },
    },
    browserify: {
      options: {
        browserifyOptions: {
          debug: true,
        }
      },

      dist: {
        files: {
          "build/bundle.js": ["scripts/main.js"],
        },
      },
    },
    uglify: {
      options: {},
      build: {
        files: [{
          expand: true,
          cwd: "build",
          src: "*.js",
          dest: "build",
          ext: ".min.js"
        }]
      },
    },
    eslint: {
      src: [
        "**/scripts/**/*.js", "!node_modules/**/*.js"
      ],
    },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-eslint");

  // Default task(s).
  grunt.registerTask("default", ["eslint", "uglify", "watch"]);
};
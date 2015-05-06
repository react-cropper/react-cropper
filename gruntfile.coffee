module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON "package.json"

    eslint:
      src: [
        "src/**/*.jsx"
        "src/**/*.js"
      ]

    babel:
      dist:
        files:
          "dist/react-cropper.js": "src/react-cropper.jsx"

  require("load-grunt-tasks") grunt
  grunt.loadNpmTasks "gruntify-eslint"

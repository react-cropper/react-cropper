module.exports = (grunt) ->

  grunt.initConfig
    babel:
      dist:
        files:
          "dist/react-cropper.js": "src/react-cropper.js"

  require("load-grunt-tasks") grunt

module.exports = function(grunt){
  grunt.initConfig({
    mochacli: {
      options: {
        ui: 'exports'
      }
    , all: ['test/*.js']
    }
  });
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('default', ['test']);
};

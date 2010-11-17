
/**
 * Module dependencies.
 */

var should = require('should');

module.exports = {
  'test .version': function(assert){
    assert.match(should.version, /^\d+\.\d+\.\d+$/);
  }
}
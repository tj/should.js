
/**
 * Module dependencies.
 */

var should = require('should')
  , assert = require('assert');

module.exports = {
  'test .version': function(){
    assert.match(should.version, /^\d+\.\d+\.\d+$/);
  }
}

/**
 * Module dependencies.
 */

var should = require('should')
  , assert = require('assert');

function err(fn, msg) {
  try {
    fn();
    assert.fail('expected an error');
  } catch (err) {
    assert.equal(msg, err.message);
  }
}

module.exports = {
  'test .version': function(){
    assert.match(should.version, /^\d+\.\d+\.\d+$/);
  },
  
  'test assertion': function(){
    'test'.should.be.a.string;
  },
  
  'test negated assertion': function(){
    err(function(){
      'test'.should.not.be.a.string;
    }, "expected 'test' not to be a string");
  },
  
  'test typeof string': function(){
    'test'.should.be.a.string;

    err(function(){
      'test'.should.not.be.a.string;
    }, "expected 'test' not to be a string");
  },
  
  'test typeof number': function(){
    (5).should.be.a.number;

    err(function(){
      (5).should.not.be.a.number;
    }, "expected 5 not to be a number");
  
    err(function(){
      'test'.should.be.a.number;
    }, "expected 'test' to be a number");
  }
};
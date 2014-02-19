
/**
 * Module dependencies.
 */

var should = require('../')
  , assert = require('assert');

function err(fn, msg) {
  try {
    fn();
    should.fail('expected an error');
  } catch (err) {
    should.equal(msg, err.message);
  }
}

module.exports['should'] = {
  'test double require': function(){
    require('../').should.equal(should);
  },

  'test assertion': function(){
    'test'.should.be.a.string;
    should.equal('foo', 'foo');
  },
  
  'test .expected and .actual': function(){
    try {
      'foo'.should.equal('bar');
    } catch (err) {
      assert('foo' == err.actual, 'err.actual');
      assert('bar' == err.expected, 'err.expected');
    }
  },
 
  'test chaining': function(){
    var user = { name: 'tj', pets: ['tobi', 'loki', 'jane', 'bandit'] };

    user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');

    user.should.have.ownProperty('name')
      .which.not.have.length(3)
        .and.be.equal('tj');
  }
};

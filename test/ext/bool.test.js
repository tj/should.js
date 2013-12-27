var err = require('../util').err;
var should = require('../../');

module.exports = {
  'test true': function(){
    true.should.be.true;
    false.should.not.be.true;
    (1).should.not.be.true;

    err(function(){
      'test'.should.be.true;
    }, "expected 'test' to be true")

    err(function(){
      true.should.not.be.true;
    }, "expected true not to be true")
  },

  'test false': function(){
    false.should.be.false;
    true.should.not.be.false;
    (0).should.not.be.false;

    err(function(){
      ''.should.be.false;
    }, "expected '' to be false")

    err(function(){
      false.should.not.be.false;
    }, "expected false not to be false")
  }
}
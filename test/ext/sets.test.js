var err = require('../util').err;
var should = require('../../');

module.exports['sets'] = {

  'test subsetOf': function() {
    [3].should.be.a.subsetOf([1, 3, 1]);
    [1, 2].should.be.a.subsetOf([7, 1, 2, 3]);
    [].should.be.a.subsetOf([3]);
    [3].should.not.be.a.subsetOf([]);
    [2].should.be.a.subsetOf([2]);
    [5].should.not.be.a.subsetOf([7, 1, 2, 3]);

    err(function() {
      [3].should.not.be.a.subsetOf([1, 3, 1]);
    }, "expected [ 3 ] not to be a subsetOf [ 1, 3, 1 ]");

    err(function() {
      [1, 2].should.not.be.a.subsetOf([7, 1, 2, 3]);
    }, "expected [ 1, 2 ] not to be a subsetOf [ 7, 1, 2, 3 ]");
  },

  'test supersetOf': function() {
    [1, 3, 1].should.be.a.supersetOf([3]);
    [7, 1, 2, 3].should.be.a.supersetOf([1, 2]);
    [3].should.be.a.supersetOf([]);
    [].should.not.be.a.supersetOf([3]);
    [2].should.be.a.supersetOf([2]);
    [7, 1, 2, 3].should.not.be.a.supersetOf([5]);

    err(function() {
      [1, 3 ,1].should.not.be.a.supersetOf([3]);
    }, "expected [ 1, 3, 1 ] not to be a supersetOf [ 3 ]");

    err(function() {
      [7, 1, 2, 3].should.not.be.a.supersetOf([1, 2]);
    }, "expected [ 7, 1, 2, 3 ] not to be a supersetOf [ 1, 2 ]");
  }

};

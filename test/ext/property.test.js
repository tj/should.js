var err = require('../util').err;
var should = require('../../');

module.exports = {
	'test property(name)': function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');

    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have property 'foo'");
  },

  'test property(name, val)': function(){
    'test'.should.have.property('length', 4);
    'asd'.should.have.property('constructor', String);

    err(function(){
      'asd'.should.have.property('length', 4);
    }, "expected 'asd' to have property 'length' of 4 (got 3)");

    err(function(){
      'asd'.should.not.have.property('length', 3);
    }, "expected 'asd' not to have property 'length' of 3");

    err(function(){
      'asd'.should.have.property('constructor', Number);
    }, "expected 'asd' to have property 'constructor' of [Function: Number] (got [Function: String])");
  },

  'test length(n)': function(){
    'test'.should.have.length(4);
    'test'.should.not.have.length(3);
    [1,2,3].should.have.length(3);
    ({ length: 10}).should.have.length(10);

    err(function(){
      (4).should.have.length(3);
    }, "expected 4 to have property 'length'");

    err(function(){
      'asd'.should.not.have.length(3);
    }, "expected 'asd' not to have property 'length' of 3");

  },

  'test ownProperty(name)': function(){
    'test'.should.have.ownProperty('length');
    ({ length: 12 }).should.have.ownProperty('length');

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length');
    }, "expected { length: 12 } not to have own property 'length'");

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length', 'foo');
    }, "foo");

    err(function(){
      ({ length: 12 }).should.have.ownProperty('foo', 'foo');
    }, "foo");
  },

  'test ownProperty(name).equal(val)': function() {
    ({length: 10}).should.have.ownProperty('length').equal(10);
  },

  'test properties(name1, name2, ...)': function(){
    'test'.should.have.properties('length', 'indexOf');
    (4).should.not.have.properties('length');

    err(function(){
      'asd'.should.have.properties('foo');
    }, "expected 'asd' to have property 'foo'");

    err(function(){
      'asd'.should.not.have.properties('length', 'indexOf');
    }, "expected 'asd' not to have properties 'length', 'indexOf'");
  },

  'test properties([names])': function(){
    'test'.should.have.properties(['length', 'indexOf']);
    (4).should.not.have.properties(['length']);

    err(function(){
      'asd'.should.have.properties(['foo']);
    }, "expected 'asd' to have property 'foo'");
  },

 'test keys(array)': function(){
    ({ foo: 1 }).should.have.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.have.keys(['foo', 'bar']);
    ({ foo: 1, bar: 2 }).should.have.keys('foo', 'bar');
    ({}).should.have.keys();
    ({}).should.have.keys([]);

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'\n\tmissing keys: 'bar'\n\textra keys: 'foo'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', 'baz'\n\tmissing keys: 'bar', 'baz'\n\textra keys: 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys('foo');
    }, "expected { foo: 1 } not to have key 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } not to have key 'foo'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } not to have keys 'foo', 'bar'");
  },

  'test empty': function(){
    ''.should.be.empty;
    [].should.be.empty;
    ({}).should.be.empty;
    ({ length: 10 }).should.not.be.empty;

    (function() {
      arguments.should.be.empty;
    })();

    err(function(){
      ({}).should.not.be.empty;
    }, 'expected {} not to be empty');

    err(function(){
      ({ length: 10 }).should.be.empty;
    }, 'expected { length: 10 } to be empty');

    err(function(){
      'asd'.should.be.empty;
    }, "expected 'asd' to be empty");

    err(function(){
      ''.should.not.be.empty;
    }, "expected '' not to be empty");
  },

}
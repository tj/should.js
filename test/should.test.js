
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
  
  'test typeof': function(){
    'test'.should.be.a('string');

    err(function(){
      'test'.should.not.be.a('string');
    }, "expected 'test' not to be a string");
    
    (5).should.be.a('number');

    err(function(){
      (5).should.not.be.a('number');
    }, "expected 5 not to be a number");
  },
  
  'test above(n)': function(){
    (5).should.be.above(2);
    (5).should.not.be.above(5);
    (5).should.not.be.above(6);

    err(function(){
      (5).should.be.above(6);
    }, "expected 5 to be above 6");
    
    err(function(){
      (10).should.not.be.above(6);
    }, "expected 10 to be below 6");
  },
  
  'test match(regexp)': function(){
    'foobar'.should.match(/^foo/)
    'foobar'.should.not.match(/^bar/)
    
    err(function(){
      'foobar'.should.match(/^bar/i)
    }, "expected 'foobar' to match /^bar/i");
    
    err(function(){
      'foobar'.should.not.match(/^foo/i)
    }, "expected 'foobar' not to match /^foo/i");
  },
  
  'test length(n)': function(){
    'test'.should.have.length(4);
    'test'.should.not.have.length(3);
    [1,2,3].should.have.length(3);
    
    err(function(){
      (4).should.not.have.length(3);
    }, 'expected 4 to have a property \'length\'');
    
    err(function(){
      'asd'.should.not.have.length(3);
    }, "expected 'asd' to not have a length of 3");
  },
  
  'test property(n)': function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');
    
    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");
  },
  
  'test ownProperty(n)': function(){
    'test'.should.have.ownProperty('length');
    ({ length: 12 }).should.have.ownProperty('length');
    
    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");
  }
};
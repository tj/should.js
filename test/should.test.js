
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

module.exports = {
  'test double require': function(){
    require('../').should.equal(should);
  },

  'test assertion': function(){
    'test'.should.be.a.string;
    should.equal('foo', 'foo');
  },

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

  'test ok': function(){
    true.should.be.ok;
    false.should.not.be.ok;
    (1).should.be.ok;
    (0).should.not.be.ok;

    err(function(){
      ''.should.be.ok;
    }, "expected '' to be truthy");

    err(function(){
      'test'.should.not.be.ok;
    }, "expected 'test' to be falsey");
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
  },

  'test NaN': function(){
    NaN.should.be.NaN;
    Infinity.should.not.be.NaN;
    (0).should.not.be.NaN;
    false.should.not.be.NaN;
    ({}).should.not.be.NaN;
    ''.should.not.be.NaN;
    'foo'.should.not.be.NaN;
    /^$/.should.not.be.NaN;

    err(function(){
      Infinity.should.be.NaN;
    }, "expected Infinity to be NaN")

    err(function(){
      NaN.should.not.be.NaN;
    }, "expected NaN not to be NaN")
  },

  'test Infinity': function(){
    NaN.should.not.be.Infinity;
    (1/0).should.be.Infinity;
    Infinity.should.be.Infinity;
    (0).should.not.be.Infinity;
    false.should.not.be.Infinity;
    ({}).should.not.be.Infinity;
    ''.should.not.be.Infinity;
    'foo'.should.not.be.Infinity;
    /^$/.should.not.be.Infinity;

    err(function(){
      NaN.should.be.Infinity;
    }, "expected NaN to be Infinity")

    err(function(){
      Infinity.should.not.be.Infinity;
    }, "expected Infinity not to be Infinity")
  },

  'test .expected and .actual': function(){
    try {
      'foo'.should.equal('bar');
    } catch (err) {
      assert('foo' == err.actual, 'err.actual');
      assert('bar' == err.expected, 'err.expected');
    }
  },

  'test arguments': function(){
    var args = (function(){ return arguments; })(1,2,3);
    args.should.be.arguments;
    [].should.not.be.arguments;

    err(function() {
      ((function(){ return arguments; })(1,2,3)).should.not.be.arguments;
    }, "expected { '0': 1, '1': 2, '2': 3 } to not be arguments");

    err(function() {
      ({}).should.be.arguments;
    }, "expected {} to be arguments");
  },

  'test .equal()': function(){
    var foo;
    should.equal(undefined, foo);
  },

  'test typeof': function(){
    'test'.should.have.type('string');

    err(function(){
      'test'.should.not.have.type('string');
    }, "expected 'test' not to have type string");

    err(function(){
      'test'.should.not.have.type('string', 'foo');
    }, "expected 'test' not to have type string | foo");

    err(function(){
      (10).should.have.type('string');
    }, "expected 10 to have type string");

    (5).should.have.type('number');

    err(function(){
      (5).should.not.have.type('number');
    }, "expected 5 not to have type number");

    err(function(){
      (5).should.not.have.type('number', 'foo');
    }, "expected 5 not to have type number | foo");
  },

  'test instanceof': function(){
    function Foo(){}
    new Foo().should.be.an.instanceof(Foo);

    new Date().should.be.an.instanceof(Date);

    var tobi = { name: 'Tobi', age: 2 };
    tobi.should.be.an.instanceof(Object);

    var getSomething = function() {return "something"};
    getSomething.should.be.an.instanceof(Function);

    var number = Object(5);
    (number instanceof Number).should.be.true;
    number.should.be.an.instanceof(Number);

    var boolean = Object(true);
    (boolean instanceof Boolean).should.be.true;
    boolean.should.be.an.instanceof(Boolean);

    var string = Object('string');
    (string instanceof String).should.be.true;
    string.should.be.an.instanceof(String);

    err(function(){
      (3).should.an.instanceof(Foo);
    }, "expected 3 to be an instance of Foo");

    err(function(){
      (3).should.an.instanceof(Foo, 'foo');
    }, "expected 3 to be an instance of Foo | foo");

    err(function(){
      ({}).should.not.be.an.instanceof(Object);
    }, "expected {} not to be an instance of Object");
  },

  'test instanceOf (non-reserved)': function(){
    function Foo(){}
    new Foo().should.be.an.instanceOf(Foo);

    new Date().should.be.an.instanceOf(Date);

    var tobi = { name: 'Tobi', age: 2 };
    tobi.should.be.an.instanceOf(Object);

    var getSomething = function() {return "something"};
    getSomething.should.be.an.instanceOf(Function);

    err(function(){
      (9).should.an.instanceOf(Foo);
    }, "expected 9 to be an instance of Foo");

    err(function(){
      (9).should.an.instanceOf(Foo, 'foo');
    }, "expected 9 to be an instance of Foo | foo");

    function Foo2(){}
    Foo2.prototype.valueOf = function (){ return 'foo'; };
    new Foo2().should.be.an.instanceOf(Foo2);
  },

  'test Function': function() {
    var f = function() {};
    f.should.be.a.Function;

    Object.should.be.a.Function;

    Function.should.be.a.Function;

    (new Function("1 * 1")).should.be.a.Function;

    err(function() {
      (1).should.be.a.Function;
    }, "expected 1 to be a function");
  },

  'test Object': function() {
    [].should.not.be.an.Object;
    ({}).should.be.an.Object;
    Function.should.not.be.an.Object;

    (new Object()).should.be.an.Object;
    (new Date()).should.be.an.Object;

    err(function() {
      (1).should.be.an.Object;
    }, 'expected 1 to be an object');
  },

  'test String': function() {
    ''.should.be.a.String;
    ({}).should.not.be.a.String;
    (0).should.not.be.a.String;

    (new String("")).should.be.a.String;

    err(function() {
      (1).should.be.a.String
    }, 'expected 1 to be a string');
  },

  'test Array': function() {
    [].should.be.an.Array;
    (new Array(10)).should.be.an.Array;

    ''.should.not.be.Array;
    (1).should.not.be.Array;

    err(function() {
      [].should.not.be.Array
    }, 'expected [] not to be an array');
  },

  'test Number': function() {
    (1).should.be.a.Number;
    (new Number(10)).should.be.a.Number;

    NaN.should.not.be.a.Number;
    Infinity.should.not.be.a.Number;

    ({}).should.not.be.a.Number;

    err(function() {
      ([]).should.be.a.Number;
    }, 'expected [] to be a number');
  },
  'test Boolean': function() {
    (true).should.be.a.Boolean;
    (false).should.be.a.Boolean;

    (new Boolean(false)).should.be.a.Boolean;

    ({}).should.not.be.a.Boolean;

    err(function() {
      [].should.be.a.Boolean
    }, 'expected [] to be a boolean');
  },
  'test Error': function() {
    (new Error()).should.be.an.Error;

    ({}).should.not.be.Error;

    err(function() {
      [].should.be.an.Error
    }, 'expected [] to be an error');
  },

  'test within(start, finish)': function(){
    (5).should.be.within(5, 10);
    (5).should.be.within(3,6);
    (5).should.be.within(3,5);
    (5).should.not.be.within(1,3);

    err(function(){
      (5).should.not.be.within(4,6);
    }, "expected 5 to not be within 4..6");

    err(function(){
      (10).should.be.within(50,100);
    }, "expected 10 to be within 50..100");

    err(function(){
      (5).should.not.be.within(4,6, 'foo');
    }, "expected 5 to not be within 4..6 | foo");

    err(function(){
      (10).should.be.within(50,100, 'foo');
    }, "expected 10 to be within 50..100 | foo");
  },

  'test approximately(number, delta)': function() {
      (1.5).should.be.approximately(1.4, 0.2);
      (1.5).should.be.approximately(1.5, 10E-10);
      (1.5).should.not.be.approximately(1.4, 1E-2);

      err(function(){
          (99.99).should.not.be.approximately(100, 0.1);
      }, "expected 99.99 to not be approximately 100 +- 0.1");

      err(function(){
          (99.99).should.be.approximately(105, 0.1);
      }, "expected 99.99 to be approximately 105 +- 0.1");
  },

  'test above(n)': function(){
    (5).should.be.above(2);
    (5).should.be.greaterThan(2);
    (5).should.not.be.above(5);
    (5).should.not.be.above(6);

    err(function(){
      (5).should.be.above(6);
    }, "expected 5 to be above 6");

    err(function(){
      (10).should.not.be.above(6);
    }, "expected 10 to be below 6");

    err(function(){
      (5).should.be.above(6, 'foo');
    }, "expected 5 to be above 6 | foo");

    err(function(){
      (10).should.not.be.above(6, 'foo');
    }, "expected 10 to be below 6 | foo");
  },

  'test below(n)': function(){
    (2).should.be.below(5);
    (2).should.be.lessThan(5);
    (5).should.not.be.below(5);
    (6).should.not.be.below(5);

    err(function(){
      (6).should.be.below(5);
    }, "expected 6 to be below 5");

    err(function(){
      (6).should.not.be.below(10);
    }, "expected 6 to be above 10");

    err(function(){
      (6).should.be.below(5, 'foo');
    }, "expected 6 to be below 5 | foo");

    err(function(){
      (6).should.not.be.below(10, 'foo');
    }, "expected 6 to be above 10 | foo");
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

    err(function(){
      'foobar'.should.match(/^bar/i, 'foo')
    }, "expected 'foobar' to match /^bar/i | foo");

    err(function(){
      'foobar'.should.not.match(/^foo/i, 'foo')
    }, "expected 'foobar' not to match /^foo/i | foo");
  },

  'test length(n)': function(){
    'test'.should.have.length(4);
    'test'.should.not.have.length(3);
    [1,2,3].should.have.length(3);
    ({ length: 10}).should.have.length(10);

    err(function(){
      (4).should.have.length(3);
    }, 'expected 4 to have a property \'length\'');

    err(function(){
      'asd'.should.not.have.length(3);
    }, "expected 'asd' to not have a length of 3");

    err(function(){
      'asd'.should.have.length(4, 'foo');
    }, "expected 'asd' to have a length of 4 but got 3 | foo");

    err(function(){
      'asd'.should.not.have.length(3, 'foo');
    }, "expected 'asd' to not have a length of 3 | foo");

  },

  'test eql(val)': function(){
    'test'.should.eql('test');
    ({ foo: 'bar' }).should.eql({ foo: 'bar' });
    (1).should.eql(1);
    '4'.should.eql(4);
    var memo = [];
    function memorize() {
        memo.push(arguments);
    }
    memorize('a', [1, 2]);
    memorize('a', [1, 2]);
    memo[0].should.eql(memo[1]);

    err(function(){
      (4).should.eql(3);
    }, 'expected 4 to equal 3');

    err(function(){
      (4).should.eql(3, "foo");
    }, 'expected 4 to equal 3 | foo');

    err(function(){
      (3).should.not.eql(3, "foo");
    }, 'expected 3 to not equal 3 | foo');
  },

  'test .json': function(){
    var req = {
      headers: {
        'content-type': 'application/json'
      }
    };

    req.should.be.json;

    var req = {
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    };

    req.should.be.json;

    var req = {
      headers: {
        'content-type': 'application/json'
      }
    };

    (function(){
      req.should.not.be.json;
    }).should.throw();
  },

  'test equal(val)': function(){
    'test'.should.equal('test');
    (1).should.equal(1);

    err(function(){
      (4).should.equal(3);
    }, 'expected 4 to equal 3');

    err(function(){
      '4'.should.equal(4);
    }, "expected '4' to equal 4");

    err(function(){
      (3).should.equal(4, "foo");
    }, "expected 3 to equal 4 | foo");

    err(function(){
      (4).should.not.equal(4, "foo");
    }, "expected 4 to not equal 4 | foo");

    var date = new Date;
    date.should.equal(date);
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

  'test property(name)': function(){
    'test'.should.have.property('length');
    (4).should.not.have.property('length');

    err(function(){
      'asd'.should.have.property('foo');
    }, "expected 'asd' to have a property 'foo'");

    err(function(){
      'asd'.should.have.property('foo', undefined, 'foo');
    }, "expected 'asd' to have a property 'foo' | foo");

    err(function(){
      'asd'.should.not.have.property('length', undefined, 'foo');
    }, "expected 'asd' to not have a property 'length' | foo");
  },

  'test property(name, val)': function(){
    'test'.should.have.property('length', 4);
    'asd'.should.have.property('constructor', String);

    err(function(){
      'asd'.should.have.property('length', 4);
    }, "expected 'asd' to have a property 'length' of 4, but got 3");

    err(function(){
      'asd'.should.not.have.property('length', 3);
    }, "expected 'asd' to not have a property 'length' of 3");

    err(function(){
      'asd'.should.not.have.property('foo', 3);
    }, "'asd' has no property 'foo'");

    err(function(){
      'asd'.should.have.property('constructor', Number);
    }, "expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String]");

    err(function(){
      'asd'.should.have.property('length', 4, 'foo');
    }, "expected 'asd' to have a property 'length' of 4, but got 3 | foo");

    err(function(){
      'asd'.should.not.have.property('length', 3, 'foo');
    }, "expected 'asd' to not have a property 'length' of 3 | foo");

    err(function(){
      'asd'.should.not.have.property('foo', 3, 'foo');
    }, "'asd' has no property 'foo' | foo");

    err(function(){
      'asd'.should.have.property('constructor', Number, 'foo');
    }, "expected 'asd' to have a property 'constructor' of [Function: Number], but got [Function: String] | foo");
  },

  'test properties(name1, name2, ...)': function(){
    'test'.should.have.properties('length', 'indexOf');
    (4).should.not.have.properties('length');

    err(function(){
      'asd'.should.have.properties('foo');
    }, "expected 'asd' to have a property 'foo'");

    err(function(){
      'asd'.should.not.have.properties('length', 'indexOf');
    }, "expected 'asd' to not have properties 'length', and 'indexOf'");
  },

  'test properties([names])': function(){
    'test'.should.have.properties(['length', 'indexOf']);
    (4).should.not.have.properties(['length']);

    err(function(){
      'asd'.should.have.properties(['foo']);
    }, "expected 'asd' to have a property 'foo'");
  },

  'test ownProperty(name)': function(){
    'test'.should.have.ownProperty('length');
    'test'.should.haveOwnProperty('length');
    ({ length: 12 }).should.have.ownProperty('length');

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length');
    }, "expected { length: 12 } to not have own property 'length'");

    err(function(){
      ({ length: 12 }).should.not.have.ownProperty('length', 'foo');
    }, "expected { length: 12 } to not have own property 'length' | foo");

    err(function(){
      ({ length: 12 }).should.have.ownProperty('foo', 'foo');
    }, "expected { length: 12 } to have own property 'foo' | foo");
  },

  'test ownProperty(name).equal(val)': function() {
    ({length: 10}).should.have.ownProperty('length').equal(10);
  },

  'test startWith()': function() {
    'foobar'.should.startWith('foo');
    'foobar'.should.not.startWith('bar');

    err(function() {
      'foobar'.should.startWith('bar');
    }, "expected 'foobar' to start with 'bar'");

    err(function() {
      'foobar'.should.not.startWith('foo');
    }, "expected 'foobar' to not start with 'foo'");

    err(function() {
      'foobar'.should.startWith('bar', 'baz');
    }, "expected 'foobar' to start with 'bar' | baz");

    err(function() {
      'foobar'.should.not.startWith('foo', 'baz');
    }, "expected 'foobar' to not start with 'foo' | baz");
  },

  'test endWith()': function() {
    'foobar'.should.endWith('bar');
    'foobar'.should.not.endWith('foo');

    err(function() {
      'foobar'.should.endWith('foo');
    }, "expected 'foobar' to end with 'foo'");

    err(function() {
      'foobar'.should.not.endWith('bar');
    }, "expected 'foobar' to not end with 'bar'");

    err(function() {
      'foobar'.should.endWith('foo', 'baz');
    }, "expected 'foobar' to end with 'foo' | baz");

    err(function() {
      'foobar'.should.not.endWith('bar', 'baz');
    }, "expected 'foobar' to not end with 'bar' | baz");
  },

  'test include() with string': function(){
    'foobar'.should.include('bar');
    'foobar'.should.include('foo');
    'foobar'.should.not.include('baz');

    err(function(){
      'foobar'.should.include('baz');
    }, "expected 'foobar' to include 'baz'");

    err(function(){
      'foobar'.should.not.include('bar');
    }, "expected 'foobar' to not include 'bar'");

    err(function(){
      'foobar'.should.include('baz', 'foo');
    }, "expected 'foobar' to include 'baz' | foo");

    err(function(){
      'foobar'.should.not.include('bar', 'foo');
    }, "expected 'foobar' to not include 'bar' | foo");
  },

  'test include() with array': function(){
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.include('foo');
    ['foo', 'bar'].should.include('bar');
    [1,2].should.include(1);
    ['foo', 'bar'].should.not.include('baz');
    ['foo', 'bar'].should.not.include(1);

    err(function(){
      ['foo'].should.include('bar');
    }, "expected [ 'foo' ] to include 'bar'");

    err(function(){
      ['bar', 'foo'].should.not.include('foo');
    }, "expected [ 'bar', 'foo' ] to not include 'foo'");

    err(function(){
      ['foo'].should.include('bar', 'foo');
    }, "expected [ 'foo' ] to include 'bar' | foo");

    err(function(){
      ['bar', 'foo'].should.not.include('foo', 'foo');
    }, "expected [ 'bar', 'foo' ] to not include 'foo' | foo");
  },

  'test include() with object': function(){
    var tobi = { name: 'Tobi', age: 2 };
    var jane = { name: 'Jane', age: 2 };

    var user = { name: 'TJ', pet: tobi, age: 24 };

    user.should.include({ pet: tobi });
    user.should.include({ pet: tobi, name: 'TJ' });
    user.should.not.include({ pet: tobi, name: 'Someone else' });
    user.should.not.include({ pet: jane });
    user.should.not.include({ pet: jane, name: 'TJ' });

    err(function(){
      user.should.include({ pet: { name: 'Luna' } });
    }, "expected { name: 'TJ', pet: { name: 'Tobi', age: 2 }, age: 24 } to include an object equal to { pet: { name: 'Luna' } }");
  },

  'test includeEql() with array': function(){
    [['foo'], ['bar']].should.includeEql(['foo']);
    [['foo'], ['bar']].should.includeEql(['bar']);
    [['foo'], ['bar']].should.not.includeEql(['baz']);
    [].should.not.includeEql(['baz']);

    err(function(){
      [['foo']].should.includeEql(['bar']);
    }, "expected [ [ 'foo' ] ] to include an object equal to [ 'bar' ]");

    err(function(){
      [['foo']].should.not.includeEql(['foo']);
    }, "expected [ [ 'foo' ] ] to not include an object equal to [ 'foo' ]");

    err(function(){
      [['foo']].should.includeEql(['bar'], 'foo');
    }, "expected [ [ 'foo' ] ] to include an object equal to [ 'bar' ] | foo");

    err(function(){
      [['foo']].should.not.includeEql(['foo'], 'foo');
    }, "expected [ [ 'foo' ] ] to not include an object equal to [ 'foo' ] | foo");
  },

  'test keys(array)': function(){
    ({ foo: 1 }).should.have.keys(['foo']);
    ({ foo: 1, bar: 2 }).should.have.keys(['foo', 'bar']);
    ({ foo: 1, bar: 2 }).should.have.keys('foo', 'bar');

    err(function(){
      ({ foo: 1 }).should.have.keys();
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.have.keys([]);
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.not.have.keys([]);
    }, "keys required");

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar']);
    }, "expected { foo: 1 } to have key 'bar'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.have.keys(['foo', 'bar', 'baz']);
    }, "expected { foo: 1 } to have keys 'foo', 'bar', and 'baz'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1 }).should.not.have.keys(['foo']);
    }, "expected { foo: 1 } to not have key 'foo'");

    err(function(){
      ({ foo: 1, bar: 2 }).should.not.have.keys(['foo', 'bar']);
    }, "expected { foo: 1, bar: 2 } to not have keys 'foo', and 'bar'");
  },

  'test chaining': function(){
    var user = { name: 'tj', pets: ['tobi', 'loki', 'jane', 'bandit'] };
    user.should.have.property('pets').with.a.lengthOf(4);

    err(function(){
      user.should.have.property('pets').with.lengthOf(5);
    }, "expected [ 'tobi', 'loki', 'jane', 'bandit' ] to have a length of 5 but got 4");

    user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');
  },

  'test throw()': function(){
    (function(){}).should.not.throw();
    (function(){ throw new Error('fail') }).should.throw();

    err(function(){
      (function(){}).should.throw();
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){
        throw new Error('fail');
      }).should.not.throw();
    }, 'expected no exception to be thrown, got "fail"');
  },

  'test throw() with regex message': function(){
    (function(){ throw new Error('fail'); }).should.throw(/fail/);

    err(function(){
      (function(){}).should.throw(/fail/);
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw new Error('error'); }).should.throw(/fail/);
    }, "expected an exception to be thrown with a message matching /fail/, but got 'error'");
  },

  'test throw() with string message': function(){
    (function(){ throw new Error('fail'); }).should.throw('fail');

    err(function(){
      (function(){}).should.throw('fail');
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw new Error('error'); }).should.throw('fail');
    }, "expected an exception to be thrown with a message matching 'fail', but got 'error'");
  },

  'test throw() with type': function(){
    (function(){ throw new Error('fail'); }).should.throw(Error);

    err(function(){
      (function(){}).should.throw(Error);
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw 'error'; }).should.throw(Error);
    }, "expected an exception to be thrown of type Error, but got String");
  },

  'test throwError()': function(){
    (function(){}).should.not.throwError();
    (function(){ throw new Error('fail') }).should.throwError();

    err(function(){
      (function(){}).should.throwError();
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){
        throw new Error('fail');
      }).should.not.throwError();
    }, 'expected no exception to be thrown, got "fail"');
  },

  'test throwError() with regex message': function(){
    (function(){ throw new Error('fail'); }).should.throwError(/fail/);

    err(function(){
      (function(){}).should.throwError(/fail/);
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw new Error('error'); }).should.throwError(/fail/);
    }, "expected an exception to be thrown with a message matching /fail/, but got 'error'");
  },

  'test throwError() with string message': function(){
    (function(){ throw new Error('fail'); }).should.throwError('fail');

    err(function(){
      (function(){}).should.throwError('fail');
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw new Error('error'); }).should.throwError('fail');
    }, "expected an exception to be thrown with a message matching 'fail', but got 'error'");
  },

  'test throwError() with type': function(){
    (function(){ throw new Error('fail'); }).should.throw(Error);

    err(function(){
      (function(){}).should.throw(Error);
    }, 'expected an exception to be thrown');

    err(function(){
      (function(){ throw 'error'; }).should.throw(Error);
    }, "expected an exception to be thrown of type Error, but got String");
  },

  'test .inspect to format Dates': function() {
    var d = new Date();
    should(d).inspect.should.be.exactly(d.toISOString());
  },

  'test .inspect to use custom inspect on Dates': function() {
    var d = new Date();
    d.inspect = function() { return this.getTime(); }
    should(d).inspect.should.be.exactly(String(d.getTime()));
  }

};

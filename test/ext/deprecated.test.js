var err = require('../util').err;
var should = require('../../');

module.exports['deprecated'] = {
	 'test include() with string': function(){
    'foobar'.should.include('bar');
    'foobar'.should.include('foo');
    'foobar'.should.not.include('baz');

    err(function(){
      'foobar'.should.include('baz');
    }, "expected 'foobar' to include 'baz'");

    err(function(){
      'foobar'.should.not.include('bar');
    }, "expected 'foobar' not to include 'bar'");

    err(function(){
      'foobar'.should.include('baz', 'foo');
    }, "foo");
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
    }, "expected [ 'bar', 'foo' ] not to include 'foo'");

    err(function(){
      ['bar', 'foo'].should.not.include('foo', 'foo');
    }, "foo");
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
    }, "expected [ [ 'foo' ] ] not to include an object equal to [ 'foo' ]");

    err(function(){
      [['foo']].should.not.includeEql(['foo'], 'foo');
    }, "foo");
  },
}
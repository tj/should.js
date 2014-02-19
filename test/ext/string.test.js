var err = require('../util').err;
var should = require('../../');

module.exports['string'] = {
  'test startWith()': function() {
    'foobar'.should.startWith('foo');
    'foobar'.should.not.startWith('bar');

    err(function() {
      'foobar'.should.startWith('bar');
    }, "expected 'foobar' to start with 'bar'");

    err(function() {
      'foobar'.should.not.startWith('foo');
    }, "expected 'foobar' not to start with 'foo'");

    err(function() {
      'foobar'.should.startWith('bar', 'baz');
    }, "baz");

    err(function() {
      'foobar'.should.not.startWith('foo', 'baz');
    }, "baz");
  },

  'test endWith()': function() {
    'foobar'.should.endWith('bar');
    'foobar'.should.not.endWith('foo');

    err(function() {
      'foobar'.should.endWith('foo');
    }, "expected 'foobar' to end with 'foo'");

    err(function() {
      'foobar'.should.not.endWith('bar');
    }, "expected 'foobar' not to end with 'bar'");

    err(function() {
      'foobar'.should.endWith('foo', 'baz');
    }, "baz");

    err(function() {
      'foobar'.should.not.endWith('bar', 'baz');
    }, "baz");
  },

}
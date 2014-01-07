/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

var util = require('../util');

module.exports = function(should, Assertion) {
  Assertion.add('Number', function() {
    this.params = { operator: 'to be a number' };

    this.assertIf(util.isNumber(this.obj));
  }, true);

  Assertion.add('arguments', function() {
  	this.params = { operator: 'to be arguments' };
  	  
    this.assertIf(util.isArguments(this.obj));
  }, true);

  Assertion.add('type', function(type, description) {
  	this.params = { operator: 'to have type ' + type, message: description };

    (typeof this.obj).should.be.exactly(type, description);
  });

  Assertion.add('instanceof', function(constructor, description){
  	this.params = { operator: 'to be an instance of ' + constructor.name, message: description };

    this.assertIf(Object(this.obj) instanceof constructor);
  });

  Assertion.add('Function', function() {
  	this.params = { operator: 'to be a function' };

    this.assertIf(util.isFunction(this.obj));
  }, true);

  Assertion.add('Object', function() {
  	this.params = { operator: 'to be an object' };

    this.assertIf(util.isObject(this.obj));
  }, true);

  Assertion.add('String', function() {
  	this.params = { operator: 'to be a string' };

    this.assertIf(util.isString(this.obj));
  }, true);

  Assertion.add('Array', function() {
  	this.params = { operator: 'to be an array' };

    this.assertIf(Array.isArray(this.obj));
  }, true);

  Assertion.add('Boolean', function() {
  	this.params = { operator: 'to be a boolean' };

    this.assertIf(util.isBoolean(this.obj));
  }, true);

  Assertion.add('Error', function() {
  	this.params = { operator: 'to be an error' };

    this.assertIf(util.isError(this.obj));
  }, true);
 

  Assertion.alias('instanceof', 'instanceOf');
};

/*!
 * Should
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = require('sys')
  , assert = require('assert')
  , AssertionError = assert.AssertionError
  , i = util.inspect;

/**
 * Library version.
 */

exports.version = '0.0.1';

/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

Object.defineProperty(Object.prototype, 'should', {
  set: function(){},
  get: function(){
    return new Assertion(this);
  }
});

/**
 * Initialize a new `Assertion` with the given _obj_.
 *
 * @param {Mixed} obj
 * @api private
 */

function Assertion(obj) {
  this.obj = obj;
}

/**
 * Prototype.
 */

Assertion.prototype = {

  /**
   * Assert _expr_ with the given _msg_ and _negatedMsg_.
   *
   * @param {Boolean} expr
   * @param {String} msg
   * @param {String} negatedMsg
   * @api private
   */

  assert: function(expr, msg, negatedMsg){
    var msg = this.negate ? negatedMsg : msg
      , ok = this.negate ? !expr : expr;
    if (!ok) {
      throw new AssertionError({
          message: msg
        , stackStartFunction: this.assert
      });
    }
  },

  /**
   * Dummy getter.
   *
   * @api public
   */
  
  get an() {
    return this;
  },
  
  /**
   * Dummy getter.
   *
   * @api public
   */
  
  get be() {
    return this;
  },

  /**
   * Dummy getter.
   *
   * @api public
   */
  
  get have() {
    return this;
  },

  /**
   * Negation getter.
   *
   * @api public
   */
  
  get not() {
    this.negate = true;
    return this;
  },
  
  /**
   * Get object inspection string.
   *
   * @return {String}
   * @api private
   */
  
  get inspect() {
    return i(this.obj);
  },
  
  /**
   * Assert typeof. 
   *
   * @api public
   */
  
  a: function(type){
    this.assert(
        type == typeof this.obj
      , 'expected ' + this.inspect + ' to be a ' + type
      , 'expected ' + this.inspect + ' not to be a ' + type);
  },
  
  /**
   * Assert instanceof. 
   *
   * @api public
   */
  
  instanceof: function(constructor){
    var name = constructor.name;
    this.assert(
        this.obj instanceof constructor
      , 'expected ' + this.inspect + ' to be an instance of ' + name
      , 'expected ' + this.inspect + ' not to be an instance of ' + name);
  },
  
  /**
   * Assert string primitive.
   *
   * @api public
   */
  
  get string() {
    this.assert(
        'string' == typeof this.obj
      , 'expected ' + this.inspect + ' to be a string'
      , 'expected ' + this.inspect + ' not to be a string');
  },
  
  /**
   * Assert object primitive.
   *
   * @api public
   */
  
  get object() {
    this.assert(
        'object' == typeof this.obj
      , 'expected ' + this.inspect + ' to be a object'
      , 'expected ' + this.inspect + ' not to be a object');
  },
  
  /**
   * Assert numeric value above _n_.
   *
   * @param {Number} n
   * @api public
   */
  
  above: function(n){
    this.assert(
        this.obj > n
      , 'expected ' + this.inspect + ' to be above ' + n
      , 'expected ' + this.inspect + ' to be below ' + n);
  },
  
  /**
   * Assert string value matches _regexp_.
   *
   * @param {RegExp} regexp
   * @api public
   */
  
  match: function(regexp){
    this.assert(
        regexp.exec(this.obj)
      , 'expected ' + this.inspect + ' to match ' + regexp
      , 'expected ' + this.inspect + ' not to match ' + regexp);
  },
  
  /**
   * Assert property "length" exists and has value of _n_.
   *
   * @param {Number} n
   * @api public
   */
  
  length: function(n){
    this.obj.should.have.property('length');
    var len = this.obj.length;
    this.assert(
        n == len
      , 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len
      , 'expected ' + this.inspect + ' to not have a length of ' + len);
  },
  
  /**
   * Assert property _name_ exists.
   *
   * @param {String} name
   * @api public
   */
  
  property: function(name){
    this.assert(
        undefined !== this.obj[name]
      , 'expected ' + this.inspect + ' to have a property ' + i(name)
      , 'expected ' + this.inspect + ' to not have a property ' + i(name));
  },
  
  /**
   * Assert own property _name_ exists.
   *
   * @param {String} name
   * @api public
   */
  
  ownProperty: function(name){
    this.assert(
        this.obj.hasOwnProperty(name)
      , 'expected ' + this.inspect + ' to have own property ' + i(name)
      , 'expected ' + this.inspect + ' to not have own property ' + i(name));
  }
};

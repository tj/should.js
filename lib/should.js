/*!
 * Should
 * Copyright(c) 2010-2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util = require('./util')
  , assert = util.assert
  , AssertionError = assert.AssertionError
  , statusCodes = require('./http').STATUS_CODES
  , eql = require('./eql')
  , inspect = util.inspect;

/**
 * Our function should
 * @param obj
 * @returns {Assertion}
 */
var should = function(obj) {
  return new Assertion(util.isWrapperType(obj) ? obj.valueOf(): obj);
};

/**
 * Initialize a new `Assertion` with the given _obj_.
 *
 * @param {*} obj
 * @api private
 */

var Assertion = should.Assertion = function Assertion(obj) {
  this.obj = obj;
};

Assertion.add = function(name, f, isGetter) {
  var prop = {};
  prop[isGetter ? 'get' : 'value'] = function assertion() {
    var context = new Assertion(this.obj);
    try {
      f.apply(context, arguments);
    } catch(e) {
      this.copy(context);
      if(e instanceof should.AssertionError) {
        if(this.negate) {
          return this;
        }
        this.assert2(false);
      }
      // throw if it is another exception
      throw e;
    }
    this.copy(context);
    if(this.negate) {
      this.assert2(false);
    }

    return this;
  };
  Object.defineProperty(Assertion.prototype, name, prop);
};

Assertion.alias = function(from, to) {
  Assertion.prototype[to] = Assertion.prototype[from]
};

/*Assertion.prototype = {
  constructor: Assertion
}*/

should.inspect = inspect;
should.AssertionError = AssertionError;
var i = should.format = function i(value) {
  if(util.isDate(value) && typeof value.inspect !== 'function') return value.toISOString(); //show millis in dates
  return should.inspect(value);
};


should.use = function(f) {
  f(this, Assertion);
  return this;
};


/**
 * Expose should to external world.
 */
exports = module.exports = should;


/**
 * Expose api via `Object#should`.
 *
 * @api public
 */

Object.defineProperty(Object.prototype, 'should', {
  set: function(){},
  get: function(){
    return should(this);
  },
  configurable: true
});


var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Prototype.
 */

Assertion.prototype = {

  /**
   * Assert _expr_ with the given _msg_ and _negatedMsg_.
   *
   * @param {Boolean} expr
   * @param {function} msg
   * @param {function} negatedMsg
   * @param {Object} [expected]
   * @param {Boolean} [showDiff]
   * @param {String} [description]
   * @api private
   */

  assert: function(expr, msg, negatedMsg, expected, showDiff, description){
    msg = this.negate ? negatedMsg : msg

    var ok = this.negate ? !expr : expr;

    if (ok) return;

    var err = new AssertionError({
        message: msg.call(this)
      , actual: this.obj
      , expected: expected
      , stackStartFunction: this.assert
    });

    err.showDiff = showDiff;
    err.description = description

    throw err;
  },

  assert2: function(expr) {
    if(expr) return;

    var params = this.params;

    var msg = params.message, generatedMessage = false;
    if(!msg) {
      msg = 'expected ' + this.inspect + (this.negate ? ' not ': ' ') +
        params.operator + ('expected' in params  ? ' ' + i(params.expected) : '');
      generatedMessage = true;
    }

    var err = new AssertionError({
      message: msg
      , actual: this.obj
      , expected: params.expected
      , stackStartFunction: this.assert2
    });

    err.showDiff = params.showDiff;
    err.operator = params.operator;
    err.generatedMessage = generatedMessage;

    //delete this.negate;

    throw err;
  },

  copy: function(other) {
    if(!this.params)
      this.params = other.params;
  },


  /**
   * Negation modifier.
   *
   * @api public
   */

  get not() {
    this.negate = !this.negate;
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
   * Assert instanceof `Arguments`.
   *
   * @api public
   */

  get arguments() {
    this.assert(
        util.isArguments(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be arguments' }
      , function(){ return 'expected ' + this.inspect + ' to not be arguments' });
    return this;
  },

  /**
   * Assert that object is empty.
   *
   * @api public
   */

  get empty() {
    var length = this.obj.length;

    if(util.isString(this.obj) || Array.isArray(this.obj) || util.isArguments(this.obj)) {
      this.assert(
        0 === length
        , function(){ return 'expected ' + this.inspect + ' to be empty' }
        , function(){ return 'expected ' + this.inspect + ' not to be empty' });
    } else {
      var ok = true;
      for (var prop in this.obj) {
        if(hasOwnProperty.call(this.obj, prop)) {
          ok = false;
          break;
        }
      }

      this.assert(
        ok
        , function(){ return 'expected ' + this.inspect + ' to be empty' }
        , function(){ return 'expected ' + this.inspect + ' not to be empty' });

    }
    return this;
  },

  /**
   * Assert ok.
   *
   * @api public
   */

  get ok() {
    this.assert(
        this.obj
      , function(){ return 'expected ' + this.inspect + ' to be truthy' }
      , function(){ return 'expected ' + this.inspect + ' to be falsey' });
    return this;
  },

  /**
   * Assert typeof.
   *
   * @param {*} type
   * @param {String} description
   * @api public
   */
  type: function(type, description){
    this.assert(
        type == typeof this.obj
      , function(){ return 'expected ' + this.inspect + ' to have type ' + type + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' not to have type ' + type  + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert instanceof.
   *
   * @param {Function} constructor
   * @param {String} description
   * @api public
   */

  instanceof: function(constructor, description){
    var name = constructor.name;
    this.assert(
        Object(this.obj) instanceof constructor
      , function(){ return 'expected ' + this.inspect + ' to be an instance of ' + name + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' not to be an instance of ' + name + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert if given object is a function.
   */
  get Function(){
    this.assert(
      util.isFunction(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a function' }
      , function(){ return 'expected ' + this.inspect + ' not to be a function' });
    return this;
  },

  /**
   * Assert given object is an object.
   */
  get Object(){
    this.assert(
      util.isObject(this.obj) && !Array.isArray(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be an object' }
      , function(){ return 'expected ' + this.inspect + ' not to be an object' });
    return this;
  },

  /**
   * Assert given object is a string
   */
  get String(){
    this.assert(
      util.isString(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a string' }
      , function(){ return 'expected ' + this.inspect + ' not to be a string' });
    return this;
  },

  /**
   * Assert given object is an array
   */
  get Array(){
    this.assert(
      Array.isArray(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be an array' }
      , function(){ return 'expected ' + this.inspect + ' not to be an array' });
    return this;
  },

  /**
   * Assert given object is a number. NaN and Infinity are not numbers.
   */


  /**
   * Assert given object is a boolean
   */
  get Boolean(){
    this.assert(
      util.isBoolean(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be a boolean' }
      , function(){ return 'expected ' + this.inspect + ' not to be a boolean' });
    return this;
  },

  /**
   * Assert given object is an error
   */
  get Error() {
    this.assert(
      util.isError(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to be an error' }
      , function(){ return 'expected ' + this.inspect + ' not to be an error' });
    return this;
  },
  /**
   * Assert numeric value above _n_.
   *
   * @param {Number} n
   * @param {String} description
   * @api public
   */

  above: function(n, description){
    this.assert(
        this.obj > n
      , function(){ return 'expected ' + this.inspect + ' to be above ' + n + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to be below ' + n + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert numeric value below _n_.
   *
   * @param {Number} n
   * @param {String} description
   * @api public
   */

  below: function(n, description){
    this.assert(
        this.obj < n
      , function(){ return 'expected ' + this.inspect + ' to be below ' + n + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to be above ' + n + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert string value matches _regexp_.
   *
   * @param {RegExp} regexp
   * @param {String} description
   * @api public
   */

  match: function(regexp, description){
    this.assert(
        regexp.exec(this.obj)
      , function(){ return 'expected ' + this.inspect + ' to match ' + regexp + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' not to match ' + regexp + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert property "length" exists and has value of _n_.
   *
   * @param {Number} n
   * @param {String} description
   * @api public
   */

  length: function(n, description){
    this.obj.should.have.property('length');
    var len = this.obj.length;
    this.assert(
        n == len
      , function(){ return 'expected ' + this.inspect + ' to have a length of ' + n + ' but got ' + len + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not have a length of ' + len + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert property _name_ exists, with optional _val_.
   *
   * @param {String} name
   * @param {*} [val]
   * @param {String} description
   * @api public
   */

  property: function(name, val, description){
    if (this.negate && undefined !== val) {
      if (undefined === this.obj[name]) {
        throw new Error(this.inspect + ' has no property ' + i(name) + (description ? " | " + description : ""));
      }
    } else {
      this.assert(
          undefined !== this.obj[name]
        , function(){ return 'expected ' + this.inspect + ' to have a property ' + i(name) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not have a property ' + i(name) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    }

    if (undefined !== val) {
      this.assert(
          val === this.obj[name]
        , function(){ return 'expected ' + this.inspect + ' to have a property ' + i(name)
          + ' of ' + i(val) + ', but got ' + i(this.obj[name]) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not have a property ' + i(name) + ' of ' + i(val) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    }

    this.obj = this.obj[name];
    return this;
  },
  /**
   * Asset have given properties
   * @param {Array|String ...} names
   * @api public
   */
  properties: function(names) {
    var str
      , ok = true;

    names = names instanceof Array
      ? names
      : Array.prototype.slice.call(arguments);

    var len = names.length;

    if (!len) throw new Error('names required');

    // make sure they're all present
    ok = names.every(function(name){
      return this.obj[name] !== undefined;
    }, this);

    // key string
    if (len > 1) {
      names = names.map(function(name){
        return i(name);
      });
      var last = names.pop();
      str = names.join(', ') + ', and ' + last;
    } else {
      str = i(names[0]);
    }

    // message
    str = 'have ' + (len > 1 ? 'properties ' : 'a property ') + str;

    this.assert(
      ok
      , function(){ return 'expected ' + this.inspect + ' to ' + str }
      , function(){ return 'expected ' + this.inspect + ' to not ' + str });

    return this;
  },

  /**
   * Assert own property _name_ exists.
   *
   * @param {String} name
   * @param {String} description
   * @api public
   */

  ownProperty: function(name, description){
    this.assert(
      hasOwnProperty.call(this.obj, name)
      , function(){ return 'expected ' + this.inspect + ' to have own property ' + i(name) + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not have own property ' + i(name) + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    this.obj = this.obj[name];
    return this;
  },

  /**
   * Assert that string starts with `str`.
   * @param {String} str
   * @param {String} description
   * @api public
   */

  startWith: function(str, description) {
    this.assert(0 === this.obj.indexOf(str)
    , function() { return 'expected ' + this.inspect + ' to start with ' + i(str) + (description ? " | " + description : "") }
    , function() { return 'expected ' + this.inspect + ' to not start with ' + i(str) + (description ? " | " + description : "") }
    , void 0
    , void 0
    , description);
    return this;
  },

  /**
   * Assert that string ends with `str`.
   * @param {String} str
   * @param {String} description
   * @api public
   */

  endWith: function(str, description) {
    this.assert(-1 !== this.obj.indexOf(str, this.obj.length - str.length)
    , function() { return 'expected ' + this.inspect + ' to end with ' + i(str) + (description ? " | " + description : "") }
    , function() { return 'expected ' + this.inspect + ' to not end with ' + i(str) + (description ? " | " + description : "") }
    , void 0
    , void 0
    , description);
    return this;
  },

  /**
   * Assert that `obj` is present via `.indexOf()` or that `obj` contains some sub-object.
   *
   * @param {*} obj
   * @param {String} description
   * @api public
   */

  include: function(obj, description){
    if (!Array.isArray(this.obj) && !util.isString(this.obj)){
      var cmp = {};
      for (var key in obj) cmp[key] = this.obj[key];
      this.assert(
          eql(cmp, obj)
        , function(){ return 'expected ' + this.inspect + ' to include an object equal to ' + i(obj) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not include an object equal to ' + i(obj) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    } else {
      this.assert(
          ~this.obj.indexOf(obj)
        , function(){ return 'expected ' + this.inspect + ' to include ' + i(obj) + (description ? " | " + description : "") }
        , function(){ return 'expected ' + this.inspect + ' to not include ' + i(obj) + (description ? " | " + description : "") }
        , void 0
        , void 0
        , description);
    }
    return this;
  },

  /**
   * Assert that an object equal to `obj` is present.
   *
   * @param {Array} obj
   * @param {String} description
   * @api public
   */

  includeEql: function(obj, description){
    this.assert(
      this.obj.some(function(item) { return eql(obj, item); })
      , function(){ return 'expected ' + this.inspect + ' to include an object equal to ' + i(obj) + (description ? " | " + description : "") }
      , function(){ return 'expected ' + this.inspect + ' to not include an object equal to ' + i(obj) + (description ? " | " + description : "") }
      , void 0
      , void 0
      , description);
    return this;
  },

  /**
   * Assert exact keys or inclusion of keys by using
   * the `.include` modifier.
   *
   * @param {Array|String ...} keys
   * @api public
   */

  keys: function(keys){
    var str
      , ok = true;

    keys = keys instanceof Array
      ? keys
      : Array.prototype.slice.call(arguments);

    if (!keys.length) throw new Error('keys required');

    var actual = Object.keys(this.obj)
      , len = keys.length;

    // make sure they're all present
    ok = keys.every(function(key){
      return ~actual.indexOf(key);
    });

    // matching length
    ok = ok && keys.length == actual.length;

    // key string
    if (len > 1) {
      keys = keys.map(function(key){
        return i(key);
      });
      var last = keys.pop();
      str = keys.join(', ') + ', and ' + last;
    } else {
      str = i(keys[0]);
    }

    // message
    str = 'have ' + (len > 1 ? 'keys ' : 'key ') + str;

    this.assert(
        ok
      , function(){ return 'expected ' + this.inspect + ' to ' + str }
      , function(){ return 'expected ' + this.inspect + ' to not ' + str });

    return this;
  },

  /**
   * Assert that header `field` has the given `val`.
   *
   * @param {String} field
   * @param {String} val
   * @return {Assertion} for chaining
   * @api public
   */

  header: function(field, val){
    this.obj.should
      .have.property('headers').and
      .have.property(field.toLowerCase(), val);
    return this;
  },

  /**
   * Assert `.statusCode` of `code`.
   *
   * @param {Number} code
   * @return {Assertion} for chaining
   * @api public
   */

  status:  function(code){
    this.obj.should.have.property('statusCode');
    var status = this.obj.statusCode;

    this.assert(
        code == status
      , function(){ return 'expected response code of ' + code + ' ' + i(statusCodes[code])
        + ', but got ' + status + ' ' + i(statusCodes[status]) }
      , function(){ return 'expected to not respond with ' + code + ' ' + i(statusCodes[code]) });

    return this;
  },

  /**
   * Assert that this response has content-type: application/json.
   *
   * @return {Assertion} for chaining
   * @api public
   */

  get json() {
    this.obj.should.have.property('headers');
    this.obj.headers.should.have.property('content-type');
    this.obj.headers['content-type'].should.include('application/json');
    return this;
  },

  /**
   * Assert that this response has content-type: text/html.
   *
   * @return {Assertion} for chaining
   * @api public
   */

  get html() {
    this.obj.should.have.property('headers');
    this.obj.headers.should.have.property('content-type');
    this.obj.headers['content-type'].should.include('text/html');
    return this;
  },

  /**
   * Assert that this function will or will not
   * throw an exception.
   *
   * @return {Assertion} for chaining
   * @api public
   */

  throw: function(message){
    var fn = this.obj
      , err = {}
      , errorInfo = ''
      , ok = true;

    try {
      fn();
      ok = false;
    } catch (e) {
      err = e;
    }

    if (ok) {
      if ('string' == typeof message) {
        ok = message == err.message;
      } else if (message instanceof RegExp) {
        ok = message.test(err.message);
      } else if ('function' == typeof message) {
        ok = err instanceof message;
      }

      if (message && !ok) {
        if ('string' == typeof message) {
          errorInfo = " with a message matching '" + message + "', but got '" + err.message + "'";
        } else if (message instanceof RegExp) {
          errorInfo = " with a message matching " + message + ", but got '" + err.message + "'";
        } else if ('function' == typeof message) {
          errorInfo = " of type " + message.name + ", but got " + err.constructor.name;
        }
      }
    }

    this.assert(
        ok
      , function(){ return 'expected an exception to be thrown' + errorInfo }
      , function(){ return 'expected no exception to be thrown, got "' + err.message + '"' });

    return this;
  }
};

/**
 * Aliases.
 */

(function alias(name, as){
  Assertion.prototype[as] = Assertion.prototype[name];
  return alias;
})
('instanceof', 'instanceOf')
('throw', 'throwError')
('length', 'lengthOf')
('keys', 'key')
('ownProperty', 'haveOwnProperty')
('above', 'greaterThan')
('below', 'lessThan')
('include', 'contain');

should
  .use(require('./ext/assert'))
  .use(require('./ext/chain'))
  .use(require('./ext/bool'))
  .use(require('./ext/number'))
  .use(require('./ext/eql'))
  .use(require('./ext/type'))
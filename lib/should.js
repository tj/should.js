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


/**
  Way to extend Assertion function. It uses some logic 
  to define only positive assertions and itself rule with negative assertion.

  All actions happen in subcontext and this method take care about negation.
  Potentially we can add some more modifiers that does not depends from state of assertion.
*/
Assertion.add = function(name, f, isGetter) {
  var prop = {};
  prop[isGetter ? 'get' : 'value'] = function() {
    var context = new Context(this.obj);
    try {
      f.apply(context, arguments);
    } catch(e) {
      this.copy(context);
      if(e instanceof should.AssertionError) {
        if(this.negate) {
          this.obj = context.obj;
          return this;
        }
        this.assertIf(false);
      }
      // throw if it is another exception
      throw e;
    }
    this.copy(context);
    if(this.negate) {
      this.assertIf(false);
    }
    this.obj = context.obj;
    return this;
  };
  Object.defineProperty(Assertion.prototype, name, prop);
}

Assertion.alias = function(from, to) {
  Assertion.prototype[to] = Assertion.prototype[from]
};

/*Assertion.prototype = {
  constructor: Assertion
}*/

should.AssertionError = AssertionError;
var i = should.format = function i(value) {
  if(util.isDate(value) && typeof value.inspect !== 'function') return value.toISOString(); //show millis in dates
  return inspect(value, { depth: null });
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


Assertion.prototype = {
  assertIf: function(expr) {
    if(expr) return;

    var params = this.params;

    var msg = params.message, generatedMessage = false;
    if(!msg) {
      msg = 'expected ' + i(this.obj) + (this.negate ? ' not ': ' ') +
        params.operator + ('expected' in params  ? ' ' + i(params.expected) : '');
      generatedMessage = true;
    }

    var err = new AssertionError({
      message: msg
      , actual: this.obj
      , expected: params.expected
      , stackStartFunction: this.assertIf
    });

    err.showDiff = params.showDiff;
    err.operator = params.operator;
    err.generatedMessage = generatedMessage;

    throw err;
  },

  copy: function(other) {
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
};

should
  .use(require('./ext/assert'))
  .use(require('./ext/chain'))
  .use(require('./ext/bool'))
  .use(require('./ext/number'))
  .use(require('./ext/eql'))
  .use(require('./ext/type'))
  .use(require('./ext/string'))
  .use(require('./ext/property'))
  .use(require('./ext/http'))
  .use(require('./ext/error'))
  .use(require('./ext/deprecated'))

function Context(obj) {
  Assertion.apply(this, arguments);
}

Context.prototype = Object.create(Assertion.prototype);
Context.prototype.constructor = Context;
Context.prototype.copy = function(other) {
  if(!this.params) this.params = other.params;
}
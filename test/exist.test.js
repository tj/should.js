
/**
 * Module dependencies.
 */

var should = require('should');
var util = require('util');

function err(fn, msg) {
  try {
    fn();
    should.fail('expected an error');
  } catch (err) {
    should.equal(msg, err.message);
  }
}

function err_should_exist(obj) {
  err(function () {
    should.exist(obj);
  }, 'expected ' + util.inspect(obj) + ' to exist');
}

function err_should_not_exist(obj) {
  err(function () {
    should.not.exist(obj);
  }, 'expected ' + util.inspect(obj) + ' to not exist');
}

module.exports = {
  
  // static should.exist() pass:
  
  'test static should.exist() pass w/ true': function () {
    should.exist(true);
  },
  
  'test static should.exist() pass w/ number': function () {
    should.exist(42);
  },
  
  'test static should.exist() pass w/ string': function () {
    should.exist('hello');
  },
  
  'test static should.exist() pass w/ object': function () {
    should.exist({});
  },
  
  'test static should.exist() pass w/ array': function () {
    should.exist([]);
  },
  
  // static should.exist() fail:
  
  'test static should.exist() fail w/ false': function () {
    err_should_exist(false)
  },
  
  'test static should.exist() fail w/ zero': function () {
    err_should_exist(0)
  },
  
  'test static should.exist() fail w/ empty string': function () {
    err_should_exist('')
  },
  
  'test static should.exist() fail w/ null': function () {
    err_should_exist(null)
  },
  
  'test static should.exist() fail w/ undefined': function () {
    err_should_exist(undefined)
  },
  
  // static should.not.exist() pass:
  
  'test static should.not.exist() pass w/ false': function () {
    should.not.exist(false);
  },
  
  'test static should.not.exist() pass w/ zero': function () {
    should.not.exist(0);
  },
  
  'test static should.not.exist() pass w/ empty string': function () {
    should.not.exist('');
  },
  
  'test static should.not.exist() pass w/ null': function () {
    should.not.exist(null);
  },
  
  'test static should.not.exist() pass w/ undefined': function () {
    should.not.exist(undefined);
  },
  
  // static should.not.exist() fail:
  
  'test static should.not.exist() fail w/ true': function () {
    err_should_not_exist(true)
  },
  
  'test static should.not.exist() fail w/ number': function () {
    err_should_not_exist(42)
  },
  
  'test static should.not.exist() fail w/ string': function () {
    err_should_not_exist('hello')
  },
  
  'test static should.not.exist() fail w/ object': function () {
    err_should_not_exist({})
  },
  
  'test static should.not.exist() fail w/ array': function () {
    err_should_not_exist([])
  },
  
  // TODO instance tests (e.g. `true.should.exist()`) if we implement them.
  // not sure if instance is worth implementing; `foo.should.exist()` will often
  // just not work if `foo` is null or undefined. thus only static for now.
  
};

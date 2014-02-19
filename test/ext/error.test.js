var err = require('../util').err,
	should = require('../../');

module.exports['error'] = {
  'test throw()': function(){
    (function(){}).should.not.throw();
    (function(){ throw new Error('fail') }).should.throw();

    err(function(){
      (function(){}).should.throw();
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){
        throw new Error('fail');
      }).should.not.throw();
    }, 'expected [Function] not to throw exception (got [Error: fail])');
  },

  'test throw() with regex message': function(){
    (function(){ throw new Error('fail'); }).should.throw(/fail/);

    err(function(){
      (function(){}).should.throw(/fail/);
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){ throw new Error('error'); }).should.throw(/fail/);
    }, "expected [Function] to throw exception with a message matching /fail/, but got 'error'");
  },

  'test throw() with string message': function(){
    (function(){ throw new Error('fail'); }).should.throw('fail');

    err(function(){
      (function(){}).should.throw('fail');
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){ throw new Error('error'); }).should.throw('fail');
    }, "expected [Function] to throw exception with a message matching 'fail', but got 'error'");
  },

  'test throw() with type': function(){
    (function(){ throw new Error('fail'); }).should.throw(Error);

    err(function(){
      (function(){}).should.throw(Error);
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){ throw 'error'; }).should.throw(Error);
    }, "expected [Function] to throw exception of type Error, but got String");
  },

  'test throwError()': function(){
    (function(){}).should.not.throwError();
    (function(){ throw new Error('fail') }).should.throwError();

    err(function(){
      (function(){}).should.throwError();
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){
        throw new Error('fail');
      }).should.not.throwError();
    }, 'expected [Function] not to throw exception (got [Error: fail])');
  },

  'test throwError() with regex message': function(){
    (function(){ throw new Error('fail'); }).should.throwError(/fail/);

    err(function(){
      (function(){}).should.throwError(/fail/);
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){ throw new Error('error'); }).should.throwError(/fail/);
    }, "expected [Function] to throw exception with a message matching /fail/, but got 'error'");
  },

  'test throwError() with string message': function(){
    (function(){ throw new Error('fail'); }).should.throwError('fail');

    err(function(){
      (function(){}).should.throwError('fail');
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){ throw new Error('error'); }).should.throwError('fail');
    }, "expected [Function] to throw exception with a message matching 'fail', but got 'error'");
  },

  'test throwError() with type': function(){
    (function(){ throw new Error('fail'); }).should.throw(Error);

    err(function(){
      (function(){}).should.throw(Error);
    }, 'expected [Function] to throw exception');

    err(function(){
      (function(){ throw 'error'; }).should.throw(Error);
    }, "expected [Function] to throw exception of type Error, but got String");
  },
}
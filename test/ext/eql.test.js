var err = require('../util').err,
	should = require('../../');

module.exports['eql'] = {
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
  },

  'test equal(val)': function(){
    'test'.should.equal('test');
    (1).should.equal(1);

    err(function(){
      (4).should.equal(3);
    }, 'expected 4 to be 3');

    err(function(){
      '4'.should.equal(4);
    }, "expected '4' to be 4");

    var date = new Date;
    date.should.equal(date);
  },

  'test .equal()': function(){
    var foo;
    should.equal(undefined, foo);
  }
}
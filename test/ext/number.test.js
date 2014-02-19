var err = require('../util').err;
var should = require('../../');

module.exports['number'] = {
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

  'test within(start, finish)': function(){
    (5).should.be.within(5, 10);
    (5).should.be.within(3,6);
    (5).should.be.within(3,5);
    (5).should.not.be.within(1,3);

    err(function(){
      (5).should.not.be.within(4,6);
    }, "expected 5 not to be within 4..6");

    err(function(){
      (10).should.be.within(50,100);
    }, "expected 10 to be within 50..100");

    err(function(){
      (5).should.not.be.within(4,6, 'foo');
    }, "foo");

    err(function(){
      (10).should.be.within(50,100, 'foo');
    }, "foo");
  },

  'test approximately(number, delta)': function() {
    (1.5).should.be.approximately(1.4, 0.2);
    (1.5).should.be.approximately(1.5, 10E-10);
    (1.5).should.not.be.approximately(1.4, 1E-2);

    err(function(){
      (99.99).should.not.be.approximately(100, 0.1);
    }, "expected 99.99 not to be approximately 100 ±0.1");

    err(function(){
      (99.99).should.be.approximately(105, 0.1);
    }, "expected 99.99 to be approximately 105 ±0.1");
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
    }, "expected 10 not to be above 6");

    err(function(){
      (5).should.be.above(6, 'foo');
    }, "foo");

    err(function(){
      (10).should.not.be.above(6, 'foo');
    }, "foo");
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
    }, "expected 6 not to be below 10");

    err(function(){
      (6).should.be.below(5, 'foo');
    }, "foo");

    err(function(){
      (6).should.not.be.below(10, 'foo');
    }, "foo");
  }
}
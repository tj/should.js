module.exports = function(should, Assertion) {
  Assertion.add('NaN', function() {
    this.params = { operator: 'to be NaN' };

    this.is.a.Number
      .and.assert2(isNaN(this.obj));
  }, true);

  Assertion.add('Infinity', function() {
    this.params = { operator: 'to be Infinity' };

    this.is.a.Number
      .and.not.a.NaN
      .and.assert2(!isFinite(this.obj));
  }, true);

  Assertion.add('within', function(start, finish, description){
    this.params = { operator: 'to be within '+ start + '..' + finish, message: description };

    this.assert2(this.obj >= start && this.obj <= finish);
  });

  Assertion.add('approximately', function(value, delta, description) {
    this.params = { operator: 'to be approximately ' + value + " ±" + delta, message: description };

    this.assert2(Math.abs(this.obj - value) <= delta);
  });

};
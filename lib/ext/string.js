module.exports = function(should, Assertion) {
	Assertion.add('match', function(regexp, description) {
		this.params = { operator: 'to match ' + regexp, message: description };

		this.assertIf(regexp.exec(this.obj));
  });

  Assertion.add('startWith', function(str, description) {
		this.params = { operator: 'to start with ' + should.format(str), message: description };

		this.assertIf(0 === this.obj.indexOf(str));
  });

  Assertion.add('endWith', function(str, description) {
		this.params = { operator: 'to end with ' + should.format(str), message: description };

		this.assertIf(this.obj.indexOf(str, this.obj.length - str.length) >= 0);
  });
}
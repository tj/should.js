module.exports = function(should, Assertion) {
  Assertion.add('true', function() {
    this.is.exactly(true)
  }, true);

  Assertion.add('false', function() {
    this.is.exactly(false)
  }, true);

  Assertion.add('ok', function() {
  	this.params = { operator: 'to be truthy' };

    this.assertIf(this.obj);
  }, true);
};
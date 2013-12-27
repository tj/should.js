module.exports = function(should, Assertion) {
  Assertion.add('true', function() {
    this.is.exactly(true)
  }, true);

  Assertion.add('false', function() {
    this.is.exactly(false)
  }, true);
};
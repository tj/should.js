var eql = require('../eql');

module.exports = function(should, Assertion) {
  Assertion.add('eql', function(val, description) {
    this.params = { operator: 'to equal', expected: val, showDiff: true, message: description };

    this.assertIf(eql(val, this.obj));
  });

  Assertion.add('equal', function(val, description) {
    this.params = { operator: 'to be', expected: val, showDiff: true, message: description };

    this.assertIf(val === this.obj);
  });

  Assertion.alias('equal', 'exactly');
};
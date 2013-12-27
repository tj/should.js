var util = require('../util');

module.exports = function(should, Assertion) {
  Assertion.add('Number', function() {
    this.params = { operator: 'to be a number' };

    this.assert2(util.isNumber(this.obj));
  }, true);
};
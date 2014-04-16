/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function(should, Assertion) {
  Assertion.add('true', function() {
    this.is.exactly(true);
  }, true);

  Assertion.alias('true', 'True');

  Assertion.add('false', function() {
    this.is.exactly(false);
  }, true);

  Assertion.alias('false', 'False');

  Assertion.add('ok', function() {
    this.params = { operator: 'to be truthy' };

    this.assert(this.obj);
  }, true);
};
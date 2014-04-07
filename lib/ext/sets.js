/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */


module.exports = function (should, Assertion) {
  var i = should.format;

  Assertion.add('subsetOf', function (other) {
    this.params = { operator: 'to be a subsetOf ' + i(other) };

    var item;
    var obj = this.obj;
    for (var j = 0; j < obj.length; j++) {
      item = obj[j];
      this.assert(other.indexOf(item) !== -1)
    }
  });

  Assertion.add('supersetOf', function (other) {
    this.params = { operator: 'to be a supersetOf ' + i(other) };

    var item;
    var obj = this.obj;
    for (var j = 0; j < other.length; j++) {
      item = other[j];
      this.assert(obj.indexOf(item) !== -1)
    }
  });
};

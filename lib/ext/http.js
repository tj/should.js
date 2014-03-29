/*!
 * Should
 * Copyright(c) 2010-2014 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */
var util = require('../util');

//var statusCodes = require('http').STATUS_CODES;

module.exports = function(should, Assertion) {
  var i = should.format;

  Assertion.add('header', function(field, val) {
    this.have.property('headers');
    this.params = { obj: '{ ..., headers: ' + i(this.obj)  + ', ... }', operator: 'to have header ' + i(field) + (val !== undefined ? (':' + i(val)) : '') };
    if (val !== undefined) {
      this.have.property(field.toLowerCase(), val);
    } else {
      this.have.property(field.toLowerCase());
    }
  });

  Assertion.add('status', function(code) {
    //this.params = { operator: 'to have response code ' + code + ' ' + i(statusCodes[code])
    //    + ', but got ' + this.obj.statusCode + ' ' + i(statusCodes[this.obj.statusCode]) }

    this.have.property('statusCode', code);
  });

  Assertion.add('json', function() {
    this.have.property('headers')
      .and.have.property('content-type').include('application/json');
  }, true);

  Assertion.add('html', function() {
    this.have.property('headers')
      .and.have.property('content-type').include('text/html');
  }, true);
};
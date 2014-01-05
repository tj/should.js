var err = require('../util').err;
var should = require('../../');

module.exports = {
 'test .json': function(){
    var req = {
      headers: {
        'content-type': 'application/json'
      }
    };

    req.should.be.json;

    req = {
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    };

    req.should.be.json;

    req = {
      headers: {
        'content-type': 'text/html'
      }
    };

    req.should.not.be.json;

    ({}).should.not.be.json;
  },
}
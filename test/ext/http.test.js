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

  'test .status': function() {
    ({ statusCode: 300 }).should.have.not.status(200);
    
    ({ statusCode: 200 }).should.have.status(200);
  }
}
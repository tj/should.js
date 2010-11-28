//describe
var should = require('./should')
module.exports = describe

function describe (it,description){
  return {
      it: it     
    , get should () {
     return new should.Assertion(it,description )
    }
  }
}

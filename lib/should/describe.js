//describe
var should = require('./should')
exports.describe = function (it,description){
  return {
      it: it     
    , description: description 
    , get should () {
      new should.Assertion(it)
    }
  }
}.node_libraries/

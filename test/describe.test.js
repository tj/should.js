//describe.test.js

var describe = require('should/describe')

module.exports = {
  'can describe an object': function (){
    var it = 
      describe(1,'the number one');
    
    it.should.eql(1)
    it.should.be.within(0,2)
    
    
    describe(it.should,"a should about 1")
      .should.eql((1).should)
  },
  'includes description in error message': function (){
    describe(1,"the number 1")
      .should.eql(-1)
  }
}

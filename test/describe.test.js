//describe.test.js

var describe = require('should').describe

module.exports = {
  'can describe an object': function (){
    var it = 
      describe(1,'the number one');
    
    it.should.eql(1)
    it.should.be.within(0,2)
    
    describe(it.should,"a should about 1")
      .should.have.property('obj',1)
  },
  'includes description in error message': function (){
    try{
    describe(1,"the number 1")
      .should.eql(-1)
    } catch (e){
      describe(e,"an error from a failed should")
        .should.have.property('message')
      describe(e.message,"message from failed should about 1")
        .should.include.string("the number 1")
    }
  }
}

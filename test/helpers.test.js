var Helpers = require('../lib/helpers');

module.exports = {

  'test .areEqual': function(){
    var full_object1 = {'foo':'bar', 'baz': 'qux'}
    var full_object2 = {'foo':'bar', 'baz': 'qux'}
    var partial_object = {'foo':'bar'}
    
    var result = Helpers.areEqual(full_object1, full_object2);
    result.should.be.true;

    var result = Helpers.areEqual(full_object1, partial_object);
    result.should.be.false;

  },

  'test .includesObject': function(){
    //simple objects
    var full_object = {'foo':'bar', 'baz': 'qux'}
    var partial_object = {'foo':'bar'}

    var result = Helpers.includesObject(full_object, partial_object);
    result.should.be.true;

    partial_object['foo'] = 1;

    var result = Helpers.includesObject(full_object, partial_object);
    result.should.be.false;

    // nested objects
    var full_nested_object = {'foo':{'bar': 'baz'}, 'baz': 'qux'};
    var partial_nested_object = {'foo':{'bar': 'baz'}};

    var result = Helpers.includesObject(full_nested_object, partial_nested_object);
    result.should.be.true;

  }
};

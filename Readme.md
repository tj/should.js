# should.js

_should_ is an expressive, readable, test framework agnostic, assertion library. Main goals of this library __to be expressive__ and __to be helpful__. It keeps your test code clean, and your error messages helpful.

It extends the `Object.prototype` with a single non-enumerable getter that allows you to express how that object should behave, also it returns itself when required with `require`.

## Example
```javascript
var should = require('should');

var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);

// if the object was created with Object.create(null)
// then it doesn't inherit `Object` and have the `should` getter
// so you can do:

should(user).have.property('name', 'tj');
should(true).ok;

someAsyncTask(foo, function(err, result){
  should.not.exist(err);
  should.exist(result);
  result.bar.should.equal(foo);
});
```
## To begin

 1. Install it:
    
    ```bash
    $ npm install should --save-dev
    ```

 2. Require it and use:

    ```js
    var should = require('should');

    (5).should.be.exactly(5).and.be.a.Number;
    ```

## In browser

If you want to use _should_ in browser, use the `should.js` file in the root of this repository, or build it yourself. It is built with browserify (see [Makefile](https://github.com/visionmedia/should.js/blob/master/Makefile)). To build a fresh version:

```bash
# you should have browserify
$ npm install -g browserify
$ make browser
```

The script is exported to `window.Should`. It is the same as using `should` statically:

```js
Should(5).be.exactly(5)
```

Also, in the case of node.js, `Object.prototype` is extended with `should` (hence the capital S in `window.Should`):

```js
window.should.be.exactly(window);
// the same
// window is host object 
should.be.exactly(window);
// you should not really care about it

(5).should.be.exactly(5);
```

*should.js* uses EcmaScript 5 very extensively so any browser that support ES5 is supported. (IE <=8 not supported).
See [kangax's compat table](http://kangax.github.io/es5-compat-table) to know which exactly.

You can easy install it with npm or bower:
```
npm install should --save-dev
# or
bower install visionmedia/should.js
```

## Static should and assert module

For some rare cases should can be used statically, without `Object.prototype`.
It can be a replacement for the node assert module:

```javascript
assert.fail(actual, expected, message, operator) // just write wrong should assertion
assert(value, message), assert.ok(value, [message]) // should(value).ok
assert.equal(actual, expected, [message]) // should(actual).eql(expected, [message])
assert.notEqual(actual, expected, [message]) // should(actual).not.eql(expected, [message])
assert.deepEqual(actual, expected, [message]) // should(actual).eql(expected, [message])
assert.notDeepEqual(actual, expected, [message]) // should(actual).not.eql(expected, [message])
assert.strictEqual(actual, expected, [message]) // should(actual).equal(expected, [message])
assert.notStrictEqual(actual, expected, [message]) // should(actual).not.equal(expected, [message])
assert.throws(block, [error], [message]) // should(block).throw([error])
assert.doesNotThrow(block, [message]) // should(block).not.throw([error])
assert.ifError(value) // should(value).Error (to check if it is error) or should(value).not.ok (to check that it is falsy)
```

## .not

`.not` negate current assertion.

# Assertions
## chaining assertions

Every assertion will return a `should.js`-wrapped Object, so assertions can be chained.
To help chained assertions read more clearly, you can use the following helpers anywhere in your chain: `.an`, `.of`, `.a`, `.and`, `.be`, `.have`, `.with`, `.is`, `.which`. Use them for better readability; they do nothing at all.
For example:
```js
user.should.be.an.instanceOf(Object).and.have.property('name', 'tj');
user.pets.should.be.instanceof(Array).and.have.lengthOf(4);
```
Almost all assertions return the same object - so you can easy chain them. But some (eg: `.length` and `.property`) move the assertion object to a property value, so be careful.

## .ok

Assert if chained object is truthy in javascript (ie: not '', null, undefined, 0 , NaN).

Assert truthfulness:

```javascript
true.should.be.ok;
'yay'.should.be.ok;
(1).should.be.ok;
({}).should.be.ok;
```

or negated:

```javascript
false.should.not.be.ok;
''.should.not.be.ok;
(0).should.not.be.ok;
```

*Warning:* No assertions can be done on null and undefined. 
e.g. 
```js
  undefined.should.not.be.ok;
```
will give you `Uncaught TypeError: Cannot read property 'should' of undefined)`.

## .true

Assert if chained object === true:

```javascript
true.should.be.true;
'1'.should.not.be.true;
```

## .false

Assert if chained object === false:

```javascript
false.should.be.false;
(0).should.not.be.false;
```

## .eql(otherValue)

Assert if chained object is *equal* to otherValue. The object is compared by its actual content, not just reference equality.
 
```javascript
({ foo: 'bar' }).should.eql({ foo: 'bar' });
[1,2,3].should.eql([1,2,3]);
// see next example it is correct, even if it is different types, but actual content the same
[1, 2, 3].should.eql({ '0': 1, '1': 2, '2': 3 });
```
## .equal(otherValue) and .exactly(otherValue)

Assert if chained object is strictly equal to `otherValue` (using `===` - no type conversion for primitive types and reference equivalence for reference types).

```javascript
(4).should.equal(4);
'test'.should.equal('test');
[1,2,3].should.not.equal([1,2,3]);
(4).should.be.exactly(4);
```

## .startWith(str)

Assert that a string starts with `str`.

```javascript
'foobar'.should.startWith('foo');
'foobar'.should.not.startWith('bar');
```
## .endWith(str)

Assert that a string ends with `str`.

```javascript
'foobar'.should.endWith('bar');
'foobar'.should.not.endWith('foo');
```

## .within(from, to)

Assert inclusive numeric range (`<= to` and `>= from`):
```javascript
user.age.should.be.within(5, 50);
(5).should.be.within(5, 10).and.within(5, 5);
```

## .approximately(num, delta)

Assert floating point number near `num` within `delta` margin:

```javascript
(99.99).should.be.approximately(100, 0.1);
```

## .above(num) and .greaterThan(num)

Assert numeric value above the given value (`> num`):

```javascript
user.age.should.be.above(5);
user.age.should.not.be.above(100);
(5).should.be.above(0);
(5).should.not.be.above(5);
```

## .below(num) and .lessThan(num)

Assert numeric value below the given value (`< num`):

```javascript
user.age.should.be.below(100);
user.age.should.not.be.below(5);
(5).should.be.below(6);
(5).should.not.be.below(5);
```

## .NaN

Assert numeric value is NaN:

```javascript
(undefined + 0).should.be.NaN;
```

## .Infinity

Assert numeric value is Infinity:

```javascript
(1/0).should.be.Infinity;
```

## .type(str)

Assert given object is of a particular type (using __typeof__ operator):
```javascript
user.should.be.type('object');
'test'.should.be.type('string');
```

## .instanceof(constructor) and .instanceOf(constructor)

Assert given object is an instance of `constructor` (using __instanceof__ operator):

```javascript
user.should.be.an.instanceof(User);
[].should.be.an.instanceOf(Array);
```

## .arguments

Assert given object is an `Arguments`:

```javascript
var args = (function(){ return arguments; })(1,2,3);
args.should.be.arguments;
[].should.not.be.arguments;
```

## .Object, .Number, .Array, .Boolean, .Function, .String, .Error

Assert given object is instance of the given constructor (shortcut for `.instanceof` assertion).

```javascript
({}).should.be.an.Object;
(1).should.be.a.Number;
[].should.be.an.Array.and.an.Object;
(true).should.be.a.Boolean;
''.should.be.a.String;
```

## .property(name[, value])

Assert property exists and has optional value (compare using `.eql`):
```javascript
user.should.have.property('name');
user.should.have.property('age', 15);
user.should.not.have.property('rawr');
user.should.not.have.property('age', 0);
[1, 2].should.have.property('0', 1);
```

__NB__ `.property` changes the chain's object to the given property's value, so be careful when chaining after  `.property`!

## .properties(propName1, propName2, ...) or .properties([propName1, propName2, ...]) or .properties(obj)

`obj` should be an object that maps properties to their actual values.

Assert all given properties exist and have given values (compare using `.eql`):

```javascript
user.should.have.properties('name', 'age');
user.should.have.properties(['name', 'age']);
user.should.have.properties({
    name: 'denis',
    age: 24
});
```

## .length(number) and .lengthOf(number)

Assert _length_ property exists and has a value of the given number (shortcut for `.property('length', number)`):
```javascript
user.pets.should.have.length(5);
user.pets.should.have.a.lengthOf(5);
({ length: 10}).should.have.length(10);
```

__NB__ `.length` and `.lengthOf` change the chain's object to the given length value, so be careful when chaining!

## .ownProperty(str) and .hasOwnProperty(str)

Assert given object has own property (using `.hasOwnProperty`):
```javascript
({ foo: 'bar' }).should.have.ownProperty('foo').equal('bar');
```

__NB__ `.ownProperty` and `.hasOwnProperty` change the chain's object to the given property value, so be careful when chaining!

## .empty

Assert given value is empty. Strings, arrays, arguments with a length of 0, and objects without their own properties, are considered empty.

```javascript
[].should.be.empty;
''.should.be.empty;
({}).should.be.empty;
(function() {
  arguments.should.be.empty;
})();
```

## .keys([key1, key2, ...]) and .keys(key1, key2, ...) and .key(key)

Assert own object keys, which must match _exactly_,
and will fail if you omit a key or two:

```javascript
var obj = { foo: 'bar', baz: 'raz' };
obj.should.have.keys('foo', 'baz');
obj.should.have.keys(['foo', 'baz']);
({}).should.have.keys();
({}).should.have.keys('key'); //fail AssertionError: expected {} to have key 'key'missing keys: 'key'
```

## .containEql(otherValue)

Assert given value to contain something *.eql* to otherValue. See examples to understand better:

```javascript
'hello boy'.should.containEql('boy');
[1,2,3].should.containEql(3);
[[1],[2],[3]].should.containEql([3]);
[[1],[2],[3, 4]].should.not.containEql([3]);

({ b: 10 }).should.containEql({ b: 10 });
([1, 2, { a: 10 }]).should.containEql({ a: 10 });
[1, 2, 3].should.not.containEql({ a: 1 });

[{a: 'a'}, {b: 'b', c: 'c'}].should.containEql({a: 'a'});
[{a: 'a'}, {b: 'b', c: 'c'}].should.not.containEql({b: 'b'});
```

## .containDeep(otherValue)

Assert given value to contain something *.eql* to otherValue within depth.
Again see examples:

```javascript
'hello boy'.should.containDeep('boy');
[1,2,3].should.containDeep([3]);
[1,2,3].should.containDeep([1, 3]);
//but not
[1,2,3].should.containDeep([3, 1]);

({ a: { b: 10 }, b: { c: 10, d: 11, a: { b: 10, c: 11} }}).should
  .containDeep({ a: { b: 10 }, b: { c: 10, a: { c: 11 }}});

[1, 2, 3, { a: { b: { d: 12 }}}].should.containDeep([{ a: { b: {d: 12}}}]);

[[1],[2],[3]].should.containDeep([[3]]);
[[1],[2],[3, 4]].should.containDeep([[3]]);
[{a: 'a'}, {b: 'b', c: 'c'}].should.containDeep([{a: 'a'}]);
[{a: 'a'}, {b: 'b', c: 'c'}].should.containDeep([{b: 'b'}]);
```

It does not search somewhere in depth it check all pattern in depth. Objects are checked
by properties key and value; arrays are checked like sub sequences. Everyting is compared using `.eql`.
Main difference with `.containEql` is that this assertion requires full type chain -
if asserted value is an object, otherValue should be also an object (which is sub object of given).
The same is true for arrays, otherValue should be an array which compared to be subsequence of given object.

## .match(otherValue)

Assert given object matches `otherValue`.

Given: String, otherValue: regexp. Uses `RegExp#exec(str)`:
```javascript
username.should.match(/^\w+$/)
```

Given: Array, otherValue: regexp - assert each value match to regexp.
```javascript
['a', 'b', 'c'].should.match(/[a-z]/);
['a', 'b', 'c'].should.not.match(/[d-z]/);
```

Given: Object, otherValue: regexp - assert own property's values to match regexp.
```javascript
({ a: 'foo', c: 'barfoo' }).should.match(/foo$/);
({ a: 'a' }).should.not.match(/^http/);
```

Given: Anything, otherValue: function - assert if given value matched to function.

Function can use `.should` inside or return 'true' or 'false', in all other cases it do nothing. If you return value that return assertion, you will receive better error messages.

```javascript
(5).should.match(function(n) { return n > 0; });
(5).should.not.match(function(n) { return n < 0; });
(5).should.not.match(function(it) { it.should.be.an.Array; });
(5).should.match(function(it) { return it.should.be.a.Number; });
```

Now compare messages:
```javascript
(5).should.not.match(function(it) { it.should.be.a.Number; });
//AssertionError: expected 5 not to match [Function]
(5).should.not.match(function(it) { return it.should.be.a.Number; });
//AssertionError: expected 5 not to match [Function]
//	expected 5 to be a number
```

Given: object, otherValue: another object - assert that object properties match to properties of another object in meaning that describe above cases. See examples:

```javascript
({ a: 10, b: 'abc', c: { d: 10 }, d: 0 }).should
    .match({ a: 10, b: /c$/, c: function(it) { return it.should.have.property('d', 10); }});

[10, 'abc', { d: 10 }, 0].should
	.match({ '0': 10, '1': /c$/, '2': function(it) { return it.should.have.property('d', 10); } });

[10, 'abc', { d: 10 }, 0].should
    .match([10, /c$/, function(it) { return it.should.have.property('d', 10); }]); 
```

## .matchEach(otherValue)

Assert given property keys and values each match given check object.

If `otherValue` is RegExp, then each property value checked to match it:
```javascript
(['a', 'b', 'c']).should.matchEach(/[a-c]/);
```

If `otherValue` is Function, then check each property value and key matched it:
```javascript
[10, 11, 12].should.matchEach(function(it) { return it >= 10; });
[10, 11, 12].should.matchEach(function(it) { return it >= 10; });
```

In other cases it checks that each property value is `.eql` to `otherValue`:
```javascript
[10, 10].should.matchEach(10);
```
## .throw() and throwError()

Assert an exception is thrown:

```js
(function(){
  throw new Error('fail');
}).should.throw();
```

Assert an exception is not thrown:

```js
(function(){

}).should.not.throw();
```
Assert exception message matches string:

```js
(function(){
  throw new Error('fail');
}).should.throw('fail');
```

Assert exepection message matches regexp:

```js
(function(){
  throw new Error('failed to foo');
}).should.throw(/^fail/);
```

If you need to pass arguments and/or context to execute function use `Function#bind(context, arg1, ...)`:
```js
function isPositive(n) {
    if(n <= 0) throw new Error('Given number is not positive')
}

isPositive.bind(null, 10).should.not.throw();
isPositive.bind(null, -10).should.throw();
```

If you need to check something in an asynchronous function, you must do it in 2 steps:

```js
// first we need to check that function is called
var called = false;
collection.findOne({ _id: 10 }, function(err, res) {
    called = true;
    
    //second we test what you want
    res.should.be....
});

called.should.be.true;
```

In case you are using something like `Mocha`, you should use an asynchronous test, and call `done()` in the proper place to make sure that your asynchronous function is called before the test finishes.
```js
collection.findOne({ _id: 10 }, function(err, res) {
    if(err) return done(err);
    //second we test what you want
    res.should.be....
    
    done();
});
```

In general, if you need to check that something is executed, you are best using `spies`. A good example is [sinon](http://sinonjs.org/).

## .status(code)

Asserts that `.statusCode` is `code`:
```javascript
res.should.have.status(200);
```

Not included in browser build.

## .header(field[, value])

Asserts that a `.headers` object with `field` and optional `value` are present:
```javascript
res.should.have.header('content-length');
res.should.have.header('Content-Length', '123');
```

Not included in browser build.

## .json

Assert that Content-Type is "application/json; charset=utf-8"

```javascript
res.should.be.json
```

Not included in browser build.

## .html

Assert that Content-Type is "text/html; charset=utf-8"
```javascript
res.should.be.html
```

Not included in browser build.

## Optional Error description

As it can often be difficult to ascertain exactly where failed assertions are coming from in your tests, an optional description parameter can be passed to several should matchers. The description will follow the failed assertion in the error:

    (1).should.eql(0, 'some useful description')

    AssertionError: some useful description
      at Object.eql (/Users/swift/code/should.js/node_modules/should/lib/should.js:280:10)
      ...

The methods that support this optional description are: `eql`, `equal`, `within`, `instanceof`, `above`, `below`, `match`, `length`, `property`, `ownProperty`.

## Mocha example

For example you can use should with the [Mocha test framework](http://visionmedia.github.io/mocha/) by simply including it:

```javascript
var should = require('should');
var mylib = require('mylib');


describe('mylib', function() {
  it('should have a version with the format #.#.#', function() {
    lib.version.should.match(/^\d+\.\d+\.\d+$/);
  });
});
```

## Contributions

[Actual list of contributors](https://github.com/visionmedia/should.js/graphs/contributors) if you want to show it your friends.

To run the tests for _should_ simply run:

    $ make test
    
Before contribute something:

1. Your code should look like all the other code - this project should look like it was written by one man, always.
2. If you want propose something - just create an issue and describe your question with as much description as you can.
3. Please never send issues or pull requests about code style, jshint violations etc - I do not accept it (and you will spend your time for free).
4. If you think you have some general improvement, consider creating a pull request with it.
5. If you are not sure whether your improvement is general enough, just create your own plugin for should.js. (see should.use and Assertion.add usage).
6. If you add new code, it should be covered by tests. No tests - no code. 
7. If you find bug (or at least you think it is a bug), create an issue with the library version and test case that I can run and see what are you talking about, or at least full steps by which I can reproduce it.

## OMG IT EXTENDS OBJECT???!?!@

Yes, yes it does, with a single getter _should_, and no it won't break your code, because it does this **properly** with a non-enumerable property.

## License

MIT

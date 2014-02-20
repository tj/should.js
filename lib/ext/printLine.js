/*!
 * printLine
 *
 * Adds the line of code that caused the assertion to fail to it's output 
 * message. Based heavily on get-expression from github.com/EvanBurchard/wish.
 *
 * Copyright(c) 2014 Rudolf Meijering <skaapgif@gmail.com>
 * MIT Licensed
 */

var fs = require('fs');

var createLineFromErrorObject = function(){
  var stackLevel = 8;
  var line = {};
  line.full = getErrorObject().stack.split("\n")[stackLevel];
  line.fileName = (line.full.match(/(\/.*\.(coffee|js))/) || [,''])[1];
  line.number = (line.full.match(/.(?:coffee|js):([0-9]*)/) || [,''])[1];
  return line;
};

var getErrorObject = function(){
  try {
    throw Error('');
  } catch(err) {
    return err;
  }
};

var parseLine = function(content, lineNumber){
  // TODO: fix for lines with multiple function calls (e.g. func1(); test(); func3(); )
  return content.split("\n")[lineNumber].trim();
};

var getLineMessage = function(){
  // Try to extract the source code of the failed assertion. Fail silently if 
  // this isn't possible (i.e. in Node REPL).
  var line = createLineFromErrorObject();
  try {
    var content = fs.readFileSync(line.fileName, "utf8");
    sourceLine = parseLine(content, line.number-1);
    return sourceLine != '' ? ' in \'' + sourceLine + '\'' : '';
  } catch(err) {
    return '';
  }
};

module.exports = function(should, Assertion) {
  defaultMessage = Assertion.prototype.getMessage;
  Assertion.prototype.getMessage = function(){
    return defaultMessage.call(this) + getLineMessage();
  };

};

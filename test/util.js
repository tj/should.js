var assert = require('assert');

function err(fn, msg) {
  var ok = true;
  try {
    fn();
    ok = false;
  } catch (err) {
    assert.equal(msg, err.message);
  }
  if(!ok) assert.fail('expected an error');
}

exports.err = err;
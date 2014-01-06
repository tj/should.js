module.exports = function(should, Assertion) {

  function addLink(name) {
    Object.defineProperty(Assertion.prototype, name, {
      get: function() {
        return this;
      }
    });
  }

  ['an', 'of', 'a', 'and', 'be', 'have', 'with', 'is', 'which'].forEach(addLink);
};
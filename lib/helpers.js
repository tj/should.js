var Helpers = {};

// Stolen from https://gist.github.com/1251001/a228117756e2e9eed2d31ed1077a5a4353d997fb
Helpers.areEqual = function (a, b) {
        var self = this;
        var typeofa, typeofb, i, len, key;

        // If a and b refer to the same object then they are equal.
        if (a === b) return true;

        // Get the native type of both a and b. Use the built-in valueOf()
        // function to get the native object of each variable.
        typeofa = a === null ? "null" : typeof (a = a ? a.valueOf() : a);
        typeofb = b === null ? "null" : typeof (b = b ? b.valueOf() : b);

        // If a and b are not the same native type.
        if (typeofa !== typeofb) return false;

        switch (typeofa) {
            case "string":
            case "boolean":
            case "number":
            case "functon":
            case "undefined":
            case "null":
                return a === b;
        }

        // Convert the native type to a string. This allows us to test
        // if either a or b are Arrays and then handle accordingly.
        typeofa = ({}).toString.call(a);
        typeofb = ({}).toString.call(b);

        if (typeofa === typeofb) {
            // Compare the items of two arrays
            if (typeofa === "[object Array]") {
                if (a.length !== b.length) return false;

                len = a.length;
                for (i = 0; i < len; i++) {
                    if (!self.areEqual(a[i], b[i])) return false;
                }
            // Compare the keys of two objects
            } else {
                for (key in a) {
                    if (!(key in b)) return false;

                    if (!self.areEqual(a[key], b[key])) return false;
                }
            }
        } else {
            return false;
        }

        return true;
    }

Helpers.includesObject = function(a, b){
  var extracted = {};

  for (var property in b){
    extracted[property] = a[property];
  }

  return Helpers.areEqual(extracted, b);

}

module.exports = Helpers;

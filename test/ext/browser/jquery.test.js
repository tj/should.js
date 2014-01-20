var err = require('../../util').err;
var fs = require('fs');
var jsdom = require('jsdom');
var path = require('path');

var jQuerySource = fs.readFileSync(path.resolve('node_modules/jquery/dist/jquery.js', '.'), "utf-8");
var shouldSource = fs.readFileSync(path.resolve('should.js.for-tests', '.'), "utf-8");

function executeWithJsdom(html, callback) {
  if (typeof html === 'function') {
    callback = html;
    html = null;
  }

  jsdom.env({
    html: html || '<body></body>',
    src: [jQuerySource, shouldSource],
    done: function (errors, window) {
      if (errors) {
        throw errors;
      } else {
        callback(window);
      }
    }
  });
}

module.exports = {
  // commented out because :visible and :hidden are flaky is jsdom

  // 'test visible()': function(done) {
  //   executeWithJsdom(function (window) {
  //     window.$('<div></div>').appendTo(window.document.body).should.be.visible;

  //     err(function () {
  //       window.$('<div></div>').should.be.visible;
  //     }, "expected { '0': <div></div>, length: 1 } to be visible");

  //     done();
  //   });
  // },

  // 'test hidden()': function(done) {
  //   executeWithJsdom(function (window) {
  //     window.$('<div></div>').should.be.hidden;

  //     err(function () {
  //       window.$('<div></div>').appendTo(window.document.body).should.be.hidden;
  //     }, "expected { '0': <div></div>, length: 1 } to be hidden");

  //     done();
  //   });
  // },

  'test haveClass()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<div class="hello"></div>').should.haveClass('hello');

      err(function () {
        window.$('<div></div>').should.haveClass('hello');
      }, "expected <div></div> to have class hello");

      done();
    });
  },

  'test haveCss()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<div style="background-color: red"></div>').should.haveCss({
        backgroundColor: 'red'
      });

      err(function () {
        window.$('<div style="background-color: blue"></div>').should.haveCss({
          backgroundColor: 'red'
        });
      }, "expected <div style=\"background-color: blue;\"></div> to have css {\"backgroundColor\":\"red\"}");

      done();
    });
  },

  'test selected()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<option selected>foobar</option>').should.be.selected;

      err(function () {
        window.$('<option>foobar</option>').should.be.selected;
      }, "expected <option>foobar</option> to be selected");

      done();
    });
  },

  'test checked()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<input type="checkbox" checked>').should.be.checked;

      err(function () {
        window.$('<input type="checkbox">').should.be.checked;
      }, "expected <input type=\"checkbox\" /> to be checked");

      done();
    });
  },

  'test emptyJq()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<div></div>').should.be.emptyJq;

      err(function () {
        window.$('<div>hello</div>').should.be.emptyJq;
      }, "expected <div>hello</div> to be empty");

      done();
    });
  },

  'test inDOM()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<div></div>').appendTo(window.document.body).should.be.inDOM;

      err(function () {
        window.$('<div></div>').should.be.inDOM;
      }, "expected <div></div> to be in the DOM");

      done();
    });
  },

  'test exist()': function(done) {
    executeWithJsdom('<div>hello</div>', function (window) {
      window.$('div').should.exist;

      err(function () {
        window.$('table#tableID').should.exist;
      }, "expected SELECTOR(table#tableID) matching 0 elements to exist");

      done();
    });
  },

  'test haveAttr()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<a target="_blank"></a>').should.haveAttr('target', '_blank');

      err(function () {
        window.$('<a target="_blank"></a>').should.haveAttr('target', '_self');
      }, "expected <a target=\"_blank\"></a> to have attribute target with value _self");

      done();
    });
  },

  'test haveProp()': function(done) {
    executeWithJsdom(function (window) {
      var node = window.$('<a target="_blank"></a>');
      node[0].foobar = 'hello'

      node.should.haveProp('foobar', 'hello');

      err(function () {
        node.should.haveProp('bar', 'quz');
      }, "expected <a target=\"_blank\"></a> to have property bar with value quz");

      done();
    });
  },

  'test haveId()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<a id="foobar"></a>').should.haveId('foobar');

      err(function () {
        window.$('<a id="foobar"></a>').should.haveId('bazqux');
      }, "expected <a id=\"foobar\"></a> to have ID bazqux");

      done();
    });
  },

  'test haveHtml()': function(done) {
    executeWithJsdom('<div><p>hello</p></div>', function (window) {
      window.$('div').should.haveHtml('<p>hello</p>');

      err(function () {
        window.$('div').should.haveHtml('<div>goodbye</div>');
      }, "expected SELECTOR(div) matching 1 elements: <div><p>hello</p></div> to have HTML <div>goodbye</div>");

      done();
    });
  },

  'test containHtml()': function(done) {
    executeWithJsdom('<div><p><em>hello</em></p></div>', function (window) {
      window.$('div').should.containHtml('<em>hello</em>');

      err(function () {
        window.$('div').should.containHtml('<u>goodbye</u>');
      }, "expected SELECTOR(div) matching 1 elements: <div><p><em>hello</em></p></div> to contain HTML <u>goodbye</u>");

      done();
    });
  },

  'test haveText()': function(done) {
    executeWithJsdom('<div>hello</div>', function (window) {
      window.$('div').should.haveText('hello');
      window.$('div').should.haveText(/hel+o/);

      err(function () {
        window.$('div').should.haveText('goodbye');
      }, "expected SELECTOR(div) matching 1 elements: <div>hello</div> to have text goodbye");

      err(function () {
        window.$('div').should.haveText(/go+dbye/);
      }, "expected SELECTOR(div) matching 1 elements: <div>hello</div> to have text /go+dbye/");

      done();
    });
  },

  'test containText()': function(done) {
    executeWithJsdom('<div>hello</div>', function (window) {
      window.$('div').should.containText('llo');
      window.$('div').should.containText(/l+o/);

      err(function () {
        window.$('div').should.containText('odbye');
      }, "expected SELECTOR(div) matching 1 elements: <div>hello</div> to contain text odbye");

      err(function () {
        window.$('div').should.containText(/o+dby/);
      }, "expected SELECTOR(div) matching 1 elements: <div>hello</div> to contain text /o+dby/");

      done();
    });
  },

  'test haveValue()': function(done) {
    executeWithJsdom('<input type="text" value="hello" />', function (window) {
      window.$('input').should.haveValue('hello');

      err(function () {
        window.$('input').should.haveValue('goodbye');
      }, "expected SELECTOR(input) matching 1 elements: <input type=\"text\" value=\"hello\" /> to have value goodbye");

      done();
    });
  },

  'test haveData()': function(done) {
    executeWithJsdom('<input type="text" data-greeting="hello" />', function (window) {
      window.$('input').should.haveData('greeting', 'hello');

      err(function () {
        window.$('input').should.haveData('greeting', 'goodbye');
      }, "expected SELECTOR(input) matching 1 elements: <input type=\"text\" data-greeting=\"hello\" /> to have data greeting with value goodbye");

      done();
    });
  },

  'test containElement()': function(done) {
    executeWithJsdom('<div><p>hi</p></div><table></table>', function (window) {
      window.$('div').should.containElement('p');
      window.$('div').should.containElement(window.$('p'));

      err(function () {
        window.$('div').should.containElement('img');
      }, "expected SELECTOR(div) matching 1 elements: <div><p>hi</p></div> to contain SELECTOR(img) matching 0 elements");

      err(function () {
        window.$('div').should.containElement(window.$('table'));
      }, "expected SELECTOR(div) matching 1 elements: <div><p>hi</p></div> to contain SELECTOR(table) matching 1 elements: <table></table>");

      done();
    });
  },

  'test matchedBy()': function(done) {
    executeWithJsdom('<div class="foo"></div>', function (window) {
      window.$('div').should.be.matchedBy('div');
      window.$('div').should.be.matchedBy('div.foo');

      err(function () {
        window.$('div').should.be.matchedBy('.qux');
      }, "expected SELECTOR(div) matching 1 elements: <div class=\"foo\"></div> to be matched by selector .qux");

      err(function () {
        window.$('div').should.be.matchedBy('table');
      }, "expected SELECTOR(div) matching 1 elements: <div class=\"foo\"></div> to be matched by selector table");

      done();
    });
  },

  'test disabled()': function(done) {
    executeWithJsdom(function (window) {
      window.$('<input type="checkbox" disabled>').should.be.disabled;

      err(function () {
        window.$('<input type="checkbox">').should.be.disabled;
      }, "expected <input type=\"checkbox\" /> to be disabled");

      done();
    });
  },

  'test focused()': function(done) {
    executeWithJsdom('<input id="one" /><input id="two" />', function (window) {
      window.$('input#one').focus();
      window.$('input#one').should.be.focused;
      window.$('input#two').should.not.be.focused;

      err(function () {
        window.$('input#two').should.be.focused;
      }, "expected SELECTOR(input#two) matching 1 elements: <input type=\"text\" id=\"two\" /> to be focused");

      done();
    });
  },

  'test handle()': function(done) {
    executeWithJsdom('<input>', function (window) {
      window.$('input').on('click', function () {});
      window.$('input').should.handle('click');
      window.$('input').should.not.handle('change');

      err(function () {
        window.$('input').should.handle('change');
      }, "expected SELECTOR(input) matching 1 elements: <input type=\"text\" /> to handle change");

      done();
    });
  },


  'test handleWith()': function(done) {
    executeWithJsdom('<input>', function (window) {
      function clickHandler() {}
      function changeHandler() {}

      window.$('input').on('click', clickHandler);
      window.$('input').on('change', changeHandler);
      window.$('input').should.handleWith('click', clickHandler);
      window.$('input').should.not.handleWith('click', changeHandler);

      err(function () {
        window.$('input').should.handleWith('change', clickHandler);
      }, "expected SELECTOR(input) matching 1 elements: <input type=\"text\" /> to handle change with function clickHandler() {}");

      done();
    });
  }
}
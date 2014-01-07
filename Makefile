TESTS=$(shell find test -name *.test.js)

test:
	@./node_modules/.bin/mocha --ui exports --recursive $(TESTS)

browser:
	@browserify lib/browser.js -s should --dg false -o should.js

.PHONY: test browser
test:
	@browserify lib/browser.js -s Should --dg false -o should.js.for-tests
	@./node_modules/.bin/mocha --ui exports --reporter mocha-better-spec-reporter 'test/**/*.test.js'

browser:
	@browserify lib/browser.js -s Should --dg false -o should.js

.PHONY: test browser

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter spec\
		--ui bdd\
		--recursive tests

watch:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter min\
		--ui bdd\
		--watch\
		--recursive tests

.PHONY: test

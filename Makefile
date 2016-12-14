###########################################################
# Build script
###########################################################

# Operating System (darwin or linux)
PLATFORM:=$(shell uname | tr A-Z a-z)
ARCH=x64

# Nodejs
NODE_VERSION=7.2.0
NODE=lib/nodejs/bin/node
NPM=lib/nodejs/bin/npm

# Derived values
NODE_FILENAME=node-v$(NODE_VERSION)-$(PLATFORM)-$(ARCH)
NODE_MODULES_BIN=node_modules/.bin

# Node utilities
ESLINT=$(NODE_MODULES_BIN)/eslint
MOCHA=$(NODE_MODULES_BIN)/_mocha
WEBPACK=$(NODE_MODULES_BIN)/webpack
BABEL_NODE=$(NODE_MODULES_BIN)/babel-node
WEBPACK_CLIENT_CONFIG=webpack-client.config.js
WEBPACK_SERVER_CONFIG=webpack-server.config.js

.PHONY: test test-w dev-install build build-module lint clean

build: data/* src/* static/* dist/constitutional.css dist/constitutional.js dist/constitutional.min.js dist/constitutional.min.gz

# Run all JavaScript tests
test: ${NODE}
	${MOCHA} --compilers js:babel-core/register --reporter dot test/*_test.js

test-w: ${NODE}
	${MOCHA} --compilers js:babel-core/register --reporter dot test/*_test.js -w

build-module: src/*

serve:
	$(BABEL_NODE) server.js

dist/constitutional.js: src/*.js index.js package.json Makefile
	$(WEBPACK) --config $(WEBPACK_CLIENT_CONFIG) index.js dist/constitutional.js

dist/constitutional.min.js: dist/constitutional.js
	$(WEBPACK) --optimize-minimize --config $(WEBPACK_CLIENT_CONFIG) index.js dist/constitutional.min.js

dist/constitutional.min.gz: dist/constitutional.min.js
	gzip --best -c dist/constitutional.min.js > dist/constitutional.min.gz

dist/constitutional.css: dist static/*
	cp -r static/* dist/

dist:
	mkdir -p dist
	
lint:
	$(ESLINT) --config .eslintrc.json src/ test/

module-install: 
	$(NPM) install

integrate: clean lint build test

clean: 
	rm -rf dist
	rm -rf tmp

# Intall development dependencies (OS X and Linux only)
dev-install: $(NODE) $(NODE_MODULES_BIN)

# Download and unpack the Node binaries into lib/nodejs.
$(NODE):
	mkdir -p tmp
	wget -O tmp/nodejs.tar.xz --no-check-certificate "https://nodejs.org/dist/v$(NODE_VERSION)/$(NODE_FILENAME).tar.xz"
	touch tmp/nodejs.tar.xz
	mkdir -p lib/nodejs
	tar -xvf tmp/nodejs.tar.xz -C lib/nodejs --strip 1
	touch lib/nodejs/README.md
	rm -rf tmp

# Install npm dependencies
$(NODE_MODULES_BIN): package.json
	$(NPM) install --development


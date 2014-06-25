#
# sonic
# https://github.com/enytc/sonic
#
# Copyright (c) 2014, EnyTC Corporation
# Licensed under the BSD license.
#

test:
	@NODE_ENV=test ./node_modules/mocha/bin/mocha -G -R spec -u bdd -t 6000 --globals chai --colors

.PHONY: test
'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var Sonic = require('../lib/core/sonic.js'),
    sonic = new Sonic();

describe('sonic module', function() {

    describe('#constructor()', function() {

        it('should be a function', function() {

            Sonic.should.be.a('function');

        });
    });

    describe('#instance()', function() {

        it('should be a object', function() {

            sonic.should.be.a('object');
            
        });
    });
});

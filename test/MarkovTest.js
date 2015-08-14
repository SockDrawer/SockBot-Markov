'use strict';
/*globals describe, it*/

const chai = require('chai'),
    sinon = require('sinon');
chai.should();
const expect = chai.expect;

const markov = require('../Markov');
describe('Markov', () => {
    it('should export prepare()', () => {
        expect(markov.prepare).to.be.a('function');
    });
    it('should export start()', () => {
        expect(markov.start).to.be.a('function');
    });
    it('should export stop()', () => {
        expect(markov.stop).to.be.a('function');
    });
    it('should export handler()', () => {
        expect(markov.handler).to.be.a('function');
    });
    it('should have start() as a stub function', () => {
        expect(markov.start).to.not.throw();
    });
    it('should have stop() as a stub function', () => {
        expect(markov.stop).to.not.throw();
    });
});

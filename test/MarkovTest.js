'use strict';
/*globals describe, it, beforeEach, afterEach*/

const chai = require('chai'),
    sinon = require('sinon');
chai.should();
const expect = chai.expect;

//The things we're mocking
const fs = require('fs');

// The thing we're testing
const markov = require('../Markov');

// The dummies we're testing with
const configDummy = {mergeObjects: () => 0};
const eventsDummy = {onNotification: () => 0};

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
    it('should have start() as a stub function', () => {
        expect(markov.start).to.not.throw();
    });
    it('should have stop() as a stub function', () => {
        expect(markov.stop).to.not.throw();
    });
    it('should export loadCorpus()', () => {
        expect(markov.privateFns.loadCorpus).to.be.a('function');
    });
    it('should export reply()', () => {
        expect(markov.privateFns.reply).to.be.a('function');
    });
    describe('prepare()', () => {
        let sandbox, config, configSpy, events, eventSpy;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            configSpy = sinon.spy();
            eventSpy = sinon.spy();
            config = {mergeObjects: configSpy};
            events = {onNotification: eventSpy};
            sandbox.useFakeTimers(); //Stop setImmediate being called and crashing the tests
        });
        afterEach(() => {
            sandbox.restore();
        });
        it('should merge configs', () => {
            const expected = {corpus: 'path/to/corpus'};
            markov.prepare(expected, config, eventsDummy, null);
            configSpy.calledWith(true, markov.defaultConfig, expected).should.be.true;
        });
        it('should accept null config', () => {
            markov.prepare(null, config, eventsDummy, null);
            configSpy.calledWith(true, markov.defaultConfig, {}).should.be.true;
        });
        it('should accept undefined config', () => {
            markov.prepare(undefined, config, eventsDummy, null);
            configSpy.calledWith(true, markov.defaultConfig, {}).should.be.true;
        });
        it('should accept non-object config', () => {
            markov.prepare(true, config, eventsDummy, null);
            configSpy.calledWith(true, markov.defaultConfig, {}).should.be.true;
        });
        it('should register notification listener for `mentioned`', () => {
            markov.prepare(null, configDummy, events, null);
            eventSpy.calledWith('mentioned', markov.privateFns.reply).should.be.true;
        });
        it('should register notification listener for `replied`', () => {
            markov.prepare(null, configDummy, events, null);
            eventSpy.calledWith('replied', markov.privateFns.reply).should.be.true;
        });
        it('should register notification listener for `private_message`', () => {
            markov.prepare(null, configDummy, events, null);
            eventSpy.calledWith('private_message', markov.privateFns.reply).should.be.true;
        });
    });
    describe('loadCorpus()', () => {
        let sandbox, fsStub, eventSpy;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            fsStub = sandbox.stub(fs, 'readFile');
            eventSpy = sinon.spy();
            markov.internals.events = {emit: eventSpy};
        });
        afterEach(() => {
            sandbox.restore();
        });
        it('should start not ready', () => {
            markov.internals.isReady.should.be.false;
        });
        it('should not build corpus if no source file', () => {
            markov.internals.configuration = {corpus: null};
            markov.privateFns.loadCorpus();
            markov.internals.isReady.should.be.false;
        });
        it('should not build corpus if no source file', () => {
            markov.internals.configuration = {corpus: {}};
            markov.privateFns.loadCorpus();
            markov.internals.isReady.should.be.false;
        });
        it('should report error', () => {
            fsStub.yields('Oops!');
            markov.internals.configuration = {corpus: 'path'};
            markov.privateFns.loadCorpus();
            markov.internals.isReady.should.be.false;
            eventSpy.calledWith('logError', 'Oops!').should.be.true;
        });
        it('should report corpus too small', () => {
            fsStub.yields(null, 'one two');
            markov.internals.configuration = {corpus: 'path'};
            markov.privateFns.loadCorpus();
            markov.internals.isReady.should.be.false;
            eventSpy.calledWith('logWarning', 'Corpus must contain at least three words').should.be.true;
        });
        it('should build corpus', () => {
            fsStub.yields(null, 'one two three');
            markov.internals.configuration = {corpus: 'path'};
            markov.privateFns.loadCorpus();
            markov.internals.isReady.should.be.true;
        });
        it('should have correct structure', () => {
            const corpus = ['one', 'two', 'three', 'one', 'two', 'five'];
            const expected = {
                'one,two': ['three', 'five'],
                'two,three': ['one'],
                'three,one': ['two']
            };
            fsStub.yields(null, corpus.join(' '));
            markov.internals.configuration = {corpus: 'path'};
            markov.privateFns.loadCorpus();
            markov.internals.dictionary.should.deep.equal(expected);
            markov.internals.corpus.should.deep.equal(corpus);
        });
    });
    describe('reply()', () => {
        let sandbox, browserSpy;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            browserSpy = sinon.spy((_, __, ___, callback) => callback());
            markov.internals.browser = {createPost: browserSpy};
            markov.internals.corpus = ['one', 'two', 'three', 'one', 'two', 'five'];
            markov.internals.dictionary = {
                'one,two': ['three', 'five'],
                'two,three': ['one'],
                'three,one': ['two']
            };
            markov.internals.isReady = true;
        });
        afterEach(() => {
            sandbox.restore();
        });
        it('should work', () => {
            markov.privateFns.reply(null, {'topic_id': 1}, {'post_number': 2});
            browserSpy.calledWith(1, 2).should.be.true;
            expect(browserSpy.firstCall.args[2]).to.be.a('string');
            expect(browserSpy.firstCall.args[3]).to.be.a('function');
        });
        it('should generate at least 10 words', () => {
            const randomStub = sandbox.stub(Math, 'random');
            randomStub.returns(0);
            markov.privateFns.reply(null, {'topic_id': 1}, {'post_number': 2});
            expect(browserSpy.firstCall.args[2].split(/\s/).length).to.equal(10);
        });
        it('should cap at 100 words', () => {
            const randomStub = sandbox.stub(Math, 'random');
            randomStub.returns(0);
            randomStub.onFirstCall().returns(0.999999);
            markov.privateFns.reply(null, {'topic_id': 1}, {'post_number': 2});
            expect(browserSpy.firstCall.args[2].split(/\s/).length).to.equal(100);
        });
        it('should not crash when it finds no candidates', () => {
            markov.internals.dictionary = {};
            expect(markov.privateFns.reply(null, {'topic_id': 1}, {'post_number': 2})).to.not.throw;
        });
        it('should not do anything if not ready', () => {
            markov.internals.isReady = false;
            markov.privateFns.reply(null, {'topic_id': 1}, {'post_number': 2});
            browserSpy.called.should.be.false;
        });
    });
});

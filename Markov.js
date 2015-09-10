'use strict';
/**
 * Markov
 * @module Markov
 * @author RaceProUK
 * @license MIT
 */

const fs = require('fs');

const internals = {
    browser: null,
    events: null,
    configuration: exports.defaultConfig,
    isReady: false,
    dictionary: null,
    corpus: null
};

const privateFns = {
    loadCorpus: loadCorpus,
    reply: reply
};

/**
 * Default plugin configuration
 */
exports.defaultConfig = {
    /**
     * Corpus location
     *
     * @default
     * @type {string}
     */
    corpus: ''
};

/**
 * Prepare Plugin prior to login
 *
 * @param {*} plugConfig Plugin specific configuration
 * @param {Config} config Overall bot configuration
 * @param {externals.events.SockEvents} events EventEmitter used for the bot
 * @param {Browser} browser Web browser for communicating with discourse
 */
exports.prepare = function (plugConfig, config, events, browser) {
    if (plugConfig === null || typeof plugConfig !== 'object') {
        plugConfig = {};
    }
    internals.browser = browser;
    internals.events = events;
    internals.configuration = config.mergeObjects(true, exports.defaultConfig, plugConfig);
    events.onNotification('mentioned', reply);
    events.onNotification('replied', reply);
    events.onNotification('private_message', reply);
    setImmediate(loadCorpus); //Could take a while, so decouple corpus loading to allow bot to load quickly
};

/**
 * Start the plugin after login
 */
exports.start = function () {};

/**
 * Stop the plugin prior to exit or reload
 */
exports.stop = function () {};

/**
 * Load the corpus and build the in-memory corpus array and state machine dictionary
 */
function loadCorpus() {
    const corpusFile = internals.configuration.corpus;
    if (corpusFile === null || typeof corpusFile !== 'string') {
        return;
    }
    fs.readFile(corpusFile, function (err, data) {
        if (err) {
            internals.events.emit('logError', err);
            return;
        }
        const corpus = data.toString().split(/\s/);
        if (corpus.length < 3) {
            internals.events.emit('logWarning', 'Corpus must contain at least three words');
            return;
        }
        const dictionary = {};
        for (let i = 0; i < corpus.length - 2; i++) {
            const key = [corpus[i], corpus[i + 1]],
                value = corpus[i + 2];
            dictionary[key] = dictionary[key] || [];
            dictionary[key].push(value);
        }
        internals.corpus = corpus;
        internals.dictionary = dictionary;
        internals.isReady = true;
    });
};

/**
 * Reply to summons
 *
 * @param {external.notifications.Notification} notification Notification recieved
 * @param {external.topics.Topic} topic Topic trigger post belongs to
 * @param {external.posts.CleanedPost} post Post that triggered notification
 */
function reply(notification, topic, post) {
    if (!internals.isReady) {
        return;
    }
    const dictionary = internals.dictionary,
        corpus = internals.corpus,
        length = random(10, 100);
    const seed = random(0, corpus.length - 3),
        text = [corpus[seed + 1], corpus[seed]];
    while (text.length < length) {
        const key = [text[1], text[0]];
        const candidates = dictionary[key];
        if (candidates && candidates.length) {
            const index = random(0, candidates.length - 1);
            text.unshift(candidates[index]);
        } else {
            break; //No candidates, so we can't continue
        }
    }
    internals.browser.createPost(topic.id, post.post_number, text.reverse().join(' '), () => 0);
};

/**
 * Generate a random number in the specified range.
 *
 * @param {number} min - The lower bound of the range
 * @param {number} max - The upper bound of the range
 * @returns {number} The generated number
 */
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


/* istanbul ignore else */
if (typeof GLOBAL.describe === 'function') {
    //test is running
    exports.internals = internals;
    exports.privateFns = privateFns;
}

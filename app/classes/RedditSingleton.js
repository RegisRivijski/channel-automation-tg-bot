const Snoowrap = require('snoowrap');

const config = require('../../config/default');

const reddit = new Snoowrap(config.reddit);

module.exports = reddit;

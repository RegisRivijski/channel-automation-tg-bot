const mongoose = require('mongoose');

const config = require('../../config/default');

module.exports = mongoose.createConnection(config.db.mongodbChannel.url, config.db.mongodbChannel.options);

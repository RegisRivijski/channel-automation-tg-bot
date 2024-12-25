const Agenda = require('agenda');

const config = require('../../config/default');

const agenda = new Agenda({
  db: {
    address: config.db.mongodbAgenda.url,
    collection: config.db.mongodbAgenda.options.dbName,
  },
});

module.exports = agenda;

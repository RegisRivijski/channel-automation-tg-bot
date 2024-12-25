const { Telegraf } = require('telegraf');

const config = require('../config/default');

const agenda = require('./modules/agenda');

const jobs = require('./jobs/index');

module.exports = {
  async startBot() {
    const bot = new Telegraf(config.bot.apiToken, {
      telegram: {
        apiRoot: `${config.telegramBotApi.protocol}//${config.telegramBotApi.host}:${config.telegramBotApi.port}`,
      },
    });

    const jobsList = jobs.getAllJobsForBot(bot);

    await agenda.start();
    await jobs.initJobs(agenda, jobsList);

    bot.startPolling();

    console.table({
      Application: config.application.name,
      Version: config.application.version,
    });

    return bot;
  },
};

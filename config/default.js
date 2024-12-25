const packageJson = require('../package.json');

module.exports = {
  application: {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
  },
  reddit: {
    userAgent: process.env.REDDIT_USER_AGEND,
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD,
  },
  bot: {
    apiToken: process.env.CHANNEL_AUTOMATION_BOT_API_TOKEN
  },
  telegramBotApi: {
    protocol: process.env.TELEGRAM_BOT_API_PROTOCOL,
    host: process.env.TELEGRAM_BOT_API_HOST,
    port: process.env.TELEGRAM_BOT_API_PORT,
  },
  db: {
    mongodbChannel: {
      url: process.env.MONGODB_1_HOSTNAME,
      options: {
        dbName: 'channelTg',
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        authSource: 'admin',
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4,
      },
    },
    mongodbAgenda: {
      url: process.env.MONGODB_GENSHIN_AGENDA_URI,
      options: {
        dbName: 'agenda',
      },
    },
  },
};

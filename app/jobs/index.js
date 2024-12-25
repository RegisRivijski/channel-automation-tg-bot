const {
  CHANNEL_ID,
} = require('../constants/index');
const {
  SUBREDDIT_GENSHIN_MEMEPACT,
  SUBREDDIT_GENSHIN_WALLPAPER,
} = require('../constants/reddit');

const subRedditProcessor = require('../processors/subRedditProcessor');

module.exports = {
  getAllJobsForBot(bot) {
    return [
      {
        name: 'genshinMemesProcessor',
        schedule: '30 */3 * * *',
        process: subRedditProcessor.postToChannel({
          bot,
          channelId: CHANNEL_ID,
          subreddit: SUBREDDIT_GENSHIN_MEMEPACT,
        }),
      },
      {
        name: 'genshinWallpapersProcessor',
        schedule: '0 * * * *',
        process: subRedditProcessor.postToChannel({
          bot,
          channelId: CHANNEL_ID,
          subreddit: SUBREDDIT_GENSHIN_WALLPAPER,
        }),
      },
    ];
  },

  async initJobs(agenda, jobs) {
    for await (const { name, schedule, process } of jobs) {
      agenda.define(name, process);
      await agenda.every(schedule, name);
    }
  },
};

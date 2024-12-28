const {
  CHANNEL_ID,
} = require('../constants/index');
const {
  SUBREDDIT_GENSHIN_MEMEPACT,
  SUBREDDIT_GENSHIN_WALLPAPER,
  SUBREDDIT_GENSHIN_PHOTOGRAPHY,
} = require('../constants/reddit');

const promocodeProcessor = require('../processors/promocodeProcessor');
const subRedditProcessor = require('../processors/subRedditProcessor');

module.exports = {
  getAllJobsForBot(bot) {
    return [
      {
        name: 'genshinMemesProcessor',
        schedule: '30 9,13,17,21 * * *',
        process: subRedditProcessor.postToChannel({
          bot,
          channelId: CHANNEL_ID,
          subreddit: SUBREDDIT_GENSHIN_MEMEPACT,
        }),
      },
      {
        name: 'genshinWallpapersProcessor',
        schedule: '0 8,12,18,22 * * *',
        process: subRedditProcessor.postToChannel({
          bot,
          channelId: CHANNEL_ID,
          subreddit: SUBREDDIT_GENSHIN_WALLPAPER,
        }),
      },
      {
        name: 'genshinPhotoProcessor',
        schedule: '15 10,14,18,20 * * *',
        process: subRedditProcessor.postToChannel({
          bot,
          channelId: CHANNEL_ID,
          subreddit: SUBREDDIT_GENSHIN_PHOTOGRAPHY,
        }),
      },
      {
        name: 'generateAndPublishPromo',
        schedule: '0 20 3,6,9,12,15,18,21,24,27,30 * *',
        process: promocodeProcessor.generateAndPublishPromo({
          bot,
          channelId: CHANNEL_ID,
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

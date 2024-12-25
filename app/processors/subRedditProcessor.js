const redditManager = require('../managers/redditManager');
const redditPostManager = require('../managers/redditPostManager');

const redditHelper = require('../helpers/redditHelper');

module.exports = {
  postToChannel({
    bot,
    subreddit,
    channelId,
  }) {
    return async (job, done) => {
      try {
        const posts = await redditManager.getPostsFromReddit(subreddit, 50);
        const arts = redditHelper.filterPostsWithImages(posts);

        for await (const post of arts) {
          const {
            id: postId,
            title,
            author,
            created_utc: createdUtc,
            over_18: over18,
            ups,
            num_comments: numComments,
            preview: {
              images,
            },
          } = post;

          const url = images[0]?.source?.url;

          if (over18) {
            await job.touch();
            continue;
          }

          const exists = await redditPostManager.isPostExists(postId);
          if (exists) {
            console.info(`[Processor Info] Post with ID ${postId} already exists. Skipping.`);
            await job.touch();
            continue;
          }

          const caption = '<a href="https://t.me/harmony_of_teyvat">🎴Гармония Тейвaта</a>';

          console.info('url:', url);

          await bot.telegram.sendPhoto(channelId, url, {
            caption,
            parse_mode: 'HTML',
          });

          console.info(`[Processor Info] Sent post with ID ${postId} to channel.`);

          await redditPostManager.addPost({
            postId,
            url,
            title,
            author: author?.name || '',
            subreddit,
            createdAt: new Date(createdUtc * 1000),
            over18,
            upvotes: ups,
            commentsCount: numComments,
          });

          break;
        }
      } catch (e) {
        console.error('[FATAL ERROR] Job - postToChannel:', e.message);
      } finally {
        done();
      }
    };
  },
};

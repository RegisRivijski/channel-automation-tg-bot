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
        let after = null; // Идентификатор последнего поста для пагинации
        let foundPost = false;

        while (!foundPost) {
          const posts = await redditManager.getPostsFromReddit(subreddit, 50, after);

          if (!posts.length) {
            console.info(`[Processor Info] No more posts to fetch from subreddit ${subreddit}.`);
            break;
          }

          for await (const post of posts) {
            const {
              id: postId,
              title,
              author,
              created_utc: createdUtc,
              over_18: over18,
              ups,
              num_comments: numComments,
              media_metadata: mediaMetadata,
              preview: {
                images,
              } = {},
            } = post;

            const caption = '<a href="https://t.me/harmony_of_teyvat">🎴Гармония Тейвата</a>';

            let mediaArray = [];
            let firstUrl = '';

            if (mediaMetadata) {
              mediaArray = redditHelper.mediaMetaDataToArray(mediaMetadata, caption);
              firstUrl = mediaArray?.[0].media;
            } else if (images) {
              firstUrl = redditHelper.getFirstPhoto(images);
            }

            if (!firstUrl && (!mediaArray || !mediaArray.length)) {
              console.info(`[Processor Info] Post with ID ${postId} has no media files. Skipping.`);
              await job.touch();
              continue;
            }

            const exists = await redditPostManager.isPostExists(postId);
            if (exists) {
              console.info(`[Processor Info] Post with ID ${postId} already exists. Skipping.`);
              await job.touch();
              continue;
            }

            if (mediaArray.length > 1) {
              await bot.telegram.sendMediaGroup(channelId, mediaArray, {
                caption,
                parse_mode: 'HTML',
              });
            } else {
              await bot.telegram.sendPhoto(channelId, firstUrl, {
                caption,
                parse_mode: 'HTML',
              });
              console.info('firstUrl:', firstUrl);
            }

            console.info(`[Processor Info] Sent post with ID ${postId} to channel.`);

            await redditPostManager.addPost({
              postId,
              url: firstUrl,
              title,
              author: author?.name || '',
              subreddit,
              createdAt: new Date(createdUtc * 1000),
              over18,
              upvotes: ups,
              commentsCount: numComments,
            });

            foundPost = true;
            break;
          }

          after = posts[posts.length - 1]?.name;

          if (!foundPost) {
            console.info('[Processor Info] No suitable post found in current batch. Fetching more posts...');
          }
        }

        if (!foundPost) {
          console.info(`[Processor Info] No suitable post found for subreddit ${subreddit}.`);
        }
      } catch (e) {
        console.error('[FATAL ERROR] Job - postToChannel:', e.message);
      } finally {
        done();
      }
    };
  },
};

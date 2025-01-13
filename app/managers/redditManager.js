const RedditSingleton = require('../classes/RedditSingleton');

module.exports = {
  async getPostsFromReddit(subredditName, limit, after) {
    const options = { limit };
    if (after) options.after = after;

    const subreddit = await RedditSingleton.getSubreddit(subredditName);
    return subreddit.getHot(options);
  },
};

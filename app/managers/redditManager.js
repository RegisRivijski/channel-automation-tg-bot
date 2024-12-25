const RedditSingleton = require('../classes/RedditSingleton');

module.exports = {
  getPostsFromReddit(subredditName, limit) {
    return RedditSingleton
      .getSubreddit(subredditName)
      .getHot({ limit });
  },
};

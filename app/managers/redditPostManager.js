const RedditPost = require('../models/RedditPost');

const redditPostManager = {
  /**
   * Checks if a post exists in the database by its ID.
   * @param {string} postId - Unique identifier of the post.
   * @returns {Promise<boolean>} - Returns true if the post exists, otherwise false.
   */
  async isPostExists(postId) {
    try {
      const post = await RedditPost.findOne({ postId });
      return !!post;
    } catch (error) {
      console.error('[Helper Error] isPostExists:', error.message);
      throw error;
    }
  },

  /**
   * Adds a new post to the database.
   * @param {Object} postData - Object containing the post data.
   * @param {string} postData.postId - Unique identifier of the post.
   * @param {string} postData.url - URL of the image.
   * @param {string} postData.title - Title of the post.
   * @param {string} postData.author - Author of the post.
   * @param {string} postData.subreddit - Name of the subreddit.
   * @param {boolean} postData.over18 - Flag for NSFW content.
   * @param {Date} postData.createdAt - Date the post was created.
   * @param {number} [postData.upvotes=0] - Number of upvotes (optional).
   * @param {number} [postData.commentsCount=0] - Number of comments (optional).
   * @returns {Promise<Object>} - Returns the created post.
   */
  async addPost(postData) {
    try {
      const post = new RedditPost(postData);
      await post.save();
      return post;
    } catch (error) {
      console.error('[Helper Error] addPost:', error.message);
      throw error;
    }
  },
};

module.exports = redditPostManager;

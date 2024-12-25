const mongoose = require('mongoose');

const mongodbChannel = require('../modules/mongoose');

const RedditPostSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  subreddit: {
    type: String,
    required: true,
  },
  over18: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  sentAt: {
    type: Date,
    default: null,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  commentsCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongodbChannel.model('RedditPost', RedditPostSchema);

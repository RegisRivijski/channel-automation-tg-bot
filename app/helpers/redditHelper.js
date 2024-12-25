module.exports = {
  filterPostsWithImages(posts) {
    const artPosts = posts.filter((post) => post.url.endsWith('.jpg')
      || post.url.endsWith('.png')
      || post.url.endsWith('.gif'));

    return artPosts;
  },
};

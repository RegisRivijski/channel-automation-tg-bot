module.exports = {
  filterPostsWithImages(posts) {
    const artPosts = posts.filter((post) => post.url.endsWith('.jpg')
      || post.url.endsWith('.png')
      || post.url.endsWith('.gif'));

    return artPosts;
  },

  getFirstPhoto(images) {
    return images[0]?.source?.url ?? '';
  },

  covertImagesToMediaGroup(images, caption) {
    const mediaGroup = [];
    for (const image of images) {
      if (image?.source?.url) {
        mediaGroup.push({
          type: 'photo',
          media: image?.source?.url,
          caption,
          parse_mode: 'HTML',
        });
      }
    }
    return mediaGroup;
  },
};

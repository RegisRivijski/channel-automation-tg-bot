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

  mediaMetaDataToArray(mediaMetadata, caption) {
    const mediaArray = [];
    for (const media of Object.values(mediaMetadata)) {
      const url = media?.s?.u;
      if (url) {
        mediaArray.push({
          type: 'photo',
          media: media?.s?.u,
          caption,
          parse_mode: 'HTML',
        });
      }
    }
    return mediaArray;
  },
};

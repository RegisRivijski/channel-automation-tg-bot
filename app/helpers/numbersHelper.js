module.exports = {
  getRandomNumberInRange(min, max, step) {
    return Math.floor(Math.random() * ((max - min) / step + 1)) * step + min;
  },
};

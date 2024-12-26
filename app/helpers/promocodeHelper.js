const { nanoid } = require('nanoid');

module.exports = {
  getRandomPromocode() {
    return `PROMO-${nanoid(8).toUpperCase()}`;
  },
};

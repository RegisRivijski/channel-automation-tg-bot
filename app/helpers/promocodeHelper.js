module.exports = {
  getRandomPromocode(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let promocode = '';
    for (let i = 0; i < length; i += 1) {
      promocode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return promocode;
  },
};

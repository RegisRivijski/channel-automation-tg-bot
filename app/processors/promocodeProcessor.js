const {
  GACHA_SIMULATOR_PROMO_MIN_USERS,
  GACHA_SIMULATOR_PROMO_MAX_USERS,

  GACHA_SIMULATOR_PROMO_MIN_PRIMOGEMS,
  GACHA_SIMULATOR_PROMO_MAX_PRIMOGEMS,
} = require('../constants/index');

const gachaSimulatorRestManager = require('../managers/gachaSimulatorRestManager');

const numbersHelper = require('../helpers/numbersHelper');
const promocodeHelper = require('../helpers/promocodeHelper');

module.exports = {
  generateAndPublishPromo({
    bot,
    channelId,
  }) {
    return async (job, done) => {
      try {
        const promocode = promocodeHelper.getRandomPromocode();
        const maxUsers = numbersHelper.getRandomNumberInRange(
          GACHA_SIMULATOR_PROMO_MIN_USERS,
          GACHA_SIMULATOR_PROMO_MAX_USERS,
          10,
        );
        const primogemsReward = numbersHelper.getRandomNumberInRange(
          GACHA_SIMULATOR_PROMO_MIN_PRIMOGEMS,
          GACHA_SIMULATOR_PROMO_MAX_PRIMOGEMS,
          500,
        );

        await gachaSimulatorRestManager.createNewPromocode({
          promocode,
          primogems: primogemsReward,
          count: maxUsers,
        });

        console.info(`[Promo Code] Successfully created promocode: ${promocode}`);

        const message = `
🎉 <b>Новый промокод доступен!</b> 🎉

🔑 Используйте промокод: <code>${promocode}</code>
🎁 Награда: <b>${primogemsReward} Камней истока</b>
👥 Лимит: <b>Только для первых ${maxUsers} пользователей</b>

Промокод для: <a href="https://t.me/genshinGachaSimulatorBot">Геншин гача бот | Симулятор молитв ✨</a>
⏳ Торопитесь, успейте использовать его прямо сейчас!

<a href="https://t.me/harmony_of_teyvat">🎴Гармония Тейвaта</a>
        `;

        await bot.telegram.sendMessage(channelId, message.trim(), {
          parse_mode: 'HTML',
        });

        console.info(`[Promo Code] Promo code ${promocode} published in channel ${channelId}`);
      } catch (e) {
        console.error('[FATAL ERROR] Job - generateAndPublishPromo:', e.message);
      } finally {
        done();
      }
    };
  },
};

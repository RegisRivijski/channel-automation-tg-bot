const axios = require('axios');
const config = require('../../config/default');

const reqInstance = axios.create({
  headers: {
    'x-secure-hash': config.rest.gachaSimulatorRest.apiKey,
  },
});

const gachaSimulatorRestOrigin = `http://${config.rest.gachaSimulatorRest.host}:${config.rest.gachaSimulatorRest.port}`;

module.exports = {
  createNewPromocode({
    promocode,
    primogems,
    count,
  }) {
    return reqInstance.post(`${gachaSimulatorRestOrigin}/automation/promocodes`, {
      promocode,
      primogems,
      count,
    })
      .then(({ data }) => data);
  },
};

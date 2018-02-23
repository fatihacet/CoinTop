import credentialService from '../services/credentials';
import notification from '../utils/notifications';
// const { ipcRenderer } = require('electron');

export default {
  fetchBalances({ commit }) {
    // ipcRenderer.send('fetchBalances', { keys: 'will', be: 'here' });

    const data = { "Binance": { "coins": [{ "amount": 17.73139942, "name": "BNB", "price": 0.0008992, "symbol": "BNB/BTC", "total": "157.93" }, { "amount": 700.025, "name": "REQ", "price": 0.00002941, "symbol": "REQ/BTC", "total": "203.92" }, { "amount": 52.51, "name": "ARK", "price": 0.0003781, "symbol": "ARK/BTC", "total": "196.65" }, { "amount": 214.5, "name": "POE", "price": 0.000006, "symbol": "POE/BTC", "total": "12.75" }, { "amount": 450, "name": "ADA", "price": 0.0000316, "symbol": "ADA/BTC", "total": "140.85" }, { "amount": 300, "name": "XLM", "price": 0.0000352, "symbol": "XLM/BTC", "total": "104.60" }], "name": "Binance", "total": 816.7 }, "Bittrex": { "coins": [{ "amount": 1066.43196124, "name": "ADA", "price": 0.00003172, "symbol": "ADA/BTC", "total": "334.89" }, { "amount": 1.5, "name": "NEO", "price": 0.01137622, "symbol": "NEO/BTC", "total": "168.94" }, { "amount": 650.02178941, "name": "PKB", "price": 0.0000684, "symbol": "PKB/BTC", "total": "440.17" }, { "amount": 1010.63599392, "name": "RCN", "price": 0.00001498, "symbol": "RCN/BTC", "total": "149.88" }, { "amount": 867.98858945, "name": "XLM", "price": 0.00003539, "symbol": "XLM/BTC", "total": "304.11" }], "name": "Bittrex", "total": 1397.9900000000002 }, "CEX.IO": { "coins": [{ "amount": 1.48249163, "name": "BTC", "price": 1.48249163, "symbol": "BTC/USDT", "total": "15017.64", "usdPrice": 10130 }], "name": "CEX.IO", "total": 15017.64 }, "total": 17232.33 }; // eslint-disable-line

    commit('setBalances', data);
  },
  toggleLoadingState({ commit }) {
    commit('toggleLoadingState');
  },
  toggleAddExchangeModal({ commit }) {
    commit('toggleAddExchangeModal');
  },
  toggleManageExchangesModal({ commit }) {
    commit('toggleManageExchangesModal');
  },
  async fetchConfiguredExchanges({ commit }) {
    try {
      const credentials = await credentialService.getCredentials();

      commit('setConfiguredExchanges', credentials);
    } catch (e) {
      notification.show('Failed to fetch configured exchanges list.');
    }
  },
};

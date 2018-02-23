import credentialService from '../services/credentials';
import notification from '../utils/notifications';
const { ipcRenderer } = require('electron');

export default {
  async fetchBalances({ dispatch, state }) {
    await dispatch('fetchConfiguredExchanges');

    if (!state.configuredExchanges) {
      return;
    }

    const keys = {};
    state.configuredExchanges.forEach((ex) => {
      keys[ex.account] = JSON.parse(ex.password);
    });

    ipcRenderer.send('fetchBalances', keys);
  },
  setBalances({ commit }, balances) {
    commit('setBalances', balances);
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

import credentialService from '../services/credentials';
import notification from '../utils/notifications';
const { ipcRenderer } = require('electron'); // eslint-disable-line

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
  setLoadingState({ commit }, flag) {
    commit('setLoadingState', flag);
  },
  setUpdatingState({ commit }, flag) {
    commit('toggleUpdatingState', flag);
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

import credentialService from '../services/credentials';
import notification from '../utils/notifications';

export default {
  fetchData({ commit }) {
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

export default {
  fetchData({ commit }) {
    commit('toggleLoadingState');
  },
  toggleAddExchangeModal({ commit }) {
    commit('toggleAddExchangeModal');
  },
};

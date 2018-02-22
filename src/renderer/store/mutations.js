export default {
  toggleLoadingState(state) {
    state.isLoading = !state.isLoading;
  },
  toggleAddExchangeModal(state) {
    state.isAddExchangeModalVisible = !state.isAddExchangeModalVisible;
  },
  toggleManageExchangesModal(state) {
    state.isManageExchangesModalVisible = !state.isManageExchangesModalVisible;
  },
  setConfiguredExchanges(state, exchanges) {
    state.configuredExchanges = exchanges;
  },
  setBalances(state, balances) {
    state.totalBalance = balances.total;
    delete balances.total;

    state.balances = balances;
  },
};

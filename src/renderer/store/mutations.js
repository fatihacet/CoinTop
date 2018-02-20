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
};

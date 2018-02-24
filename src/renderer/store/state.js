import exchanges from '../config/exchanges';

export default {
  isLoading: false,
  isUpdating: false,
  exchangesList: exchanges,
  isAddExchangeModalVisible: false,
  isManageExchangesModalVisible: false,
  configuredExchanges: [],
  balances: {},
  totalBalance: null,
};

<script>
import { mapState, mapActions } from 'vuex';
import AppHeader from './components/AppHeader';
import AddExchangeModal from './components/AddExchangeModal';
import ManageExchangesModal from './components/ManageExchangesModal';
const { ipcRenderer } = require('electron');

export default {
  name: 'CoinTop',
  components: {
    AppHeader,
    AddExchangeModal,
    ManageExchangesModal,
  },
  computed: {
    ...mapState([
      'isLoading',
    ]),
  },
  methods: {
    ...mapActions([
      'setLoadingState',
      'setUpdatingState',
      'fetchBalances',
      'setBalances',
    ]),
  },
  mounted() {
    ipcRenderer.on('balancesFetched', (event, data) => {
      this.setLoadingState(false);
      this.setUpdatingState(false);
      this.setBalances(data);
    });

    this.fetchBalances();
    this.setLoadingState(true);

    setInterval(() => {
      this.setUpdatingState(true);
      this.fetchBalances();
    }, 45000);
  },
};
</script>

<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <app-header />
    <main class="mdl-layout__content">
      <div
        v-if="isLoading"
        class="loader-container"
      >
        <div class="app-loader mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
      </div>
      <add-exchange-modal />
      <manage-exchanges-modal />
      <router-view></router-view>
    </main>
    <div class="mdl-snackbar mdl-js-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button type="button" class="mdl-snackbar__action"></button>
    </div>
  </div>
</template>

<style lang="scss">
.mdl-layout__content {
  background: #f4f4f4;
}

.loader-container {
  margin: 50px auto;
  width: 100px;
  text-align: center;
}

dialog {
  z-index: 1000;
}
</style>

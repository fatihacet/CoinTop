<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState([
      'configuredExchanges',
    ]),
    hasExchange() {
      return this.configuredExchanges.length;
    },
    buttonTitle() {
      return this.hasExchange ? 'Manage Exchanges' : 'Add Exchange';
    },
  },
  methods: {
    ...mapActions([
      'toggleAddExchangeModal',
      'toggleManageExchangesModal',
    ]),
    handleClick() {
      this.hasExchange ? this.toggleManageExchangesModal() : this.toggleAddExchangeModal();
    },
  },
};
</script>

<template>
  <header class="app-header mdl-layout__header">
    <div class="mdl-layout__header-row">
      <img class="app-logo" src="static/logo.png" width="48" height="37" />
      <span class="mdl-layout__title">CoinTop</span>
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation">
        >
        <button
          @click="handleClick"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >
          {{buttonTitle}}
        </button>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.app-header {
  .app-logo {
    position: absolute;
    left: 20px;
  }

  .header-loader {
    height: 18px;
    width: 18px;
    margin-right: 10px;

    > .mdl-spinner__layer {
      border-color: #FFF;
    }
  }
}
</style>

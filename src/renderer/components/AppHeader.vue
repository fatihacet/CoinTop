<script>
import { mapState, mapActions } from 'vuex';
import { setInterval, clearInterval } from 'timers';

export default {
  name: 'AppHeader',
  data() {
    return {
      updatedAgo: 0,
    };
  },
  computed: {
    ...mapState([
      'configuredExchanges',
      'isUpdating',
      'totalBalance',
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
  mounted() {
    setInterval(() => {
      this.updatedAgo = this.updatedAgo + 1;
    }, 1000);
  },
  watch: {
    isUpdating() {
      if (this.isUpdating) {
        this.updatedAgo = 0;
      }
    }
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
        <span
          v-show="!isUpdating && totalBalance"
          class="updated-label"
        >
          Updated {{updatedAgo}} seconds ago.
        </span>
        <div v-show="isUpdating">
          <div class="header-loader mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
          <span class="updating-label">
            Updating...
          </span>
        </div>
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
  padding-top: 20px;
  -webkit-app-region: drag;

  .app-logo {
    position: absolute;
    left: 20px;
  }

  .updated-label {
    font-size: 13px;
    color: rgb(228, 228, 228);
    font-style: italic;
    margin-right: 15px;
  }

  .updating-label {
    margin-right: 15px;
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

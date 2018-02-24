<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  computed: {
    ...mapState([
      'configuredExchanges',
    ]),
  },
  methods: {
    ...mapActions([
      'toggleAddExchangeModal',
      'toggleManageExchangesModal',
    ]),
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
        <button
          v-show="!configuredExchanges.length"
          @click="toggleAddExchangeModal"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >
          Add Exchange
        </button>

        <button
          v-show="configuredExchanges.length"
          id="header-menu"
          class="mdl-button mdl-js-button mdl-button--icon"
        >
          <i class="material-icons">more_vert</i>
        </button>

        <ul
          v-show="configuredExchanges.length"
          class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
          for="header-menu"
        >
          <li
            @click="toggleAddExchangeModal"
            class="mdl-menu__item"
          >
            Add Exchange
          </li>
          <li
            @click="toggleManageExchangesModal"
            class="mdl-menu__item"
          >
            Manage Exchanges
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.app-logo {
  position: absolute;
  left: 20px;
}
</style>

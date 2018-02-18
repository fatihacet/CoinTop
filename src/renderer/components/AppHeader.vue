<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  methods: {
    ...mapActions([
      'toggleAddExchangeModal',
    ]),
  },
};
</script>

<template>
  <header class="app-header mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout__title">CoinTop</span>
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation">
        <button
          @click="toggleAddExchangeModal"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >
          Add Exchange
        </button>
      </nav>
    </div>
  </header>
</template>

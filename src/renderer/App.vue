<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'CoinTop',
  computed: {
    ...mapState([
      'isLoading',
    ]),
    ...mapActions([
      'fetchData',
    ]),
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <header class="app-header mdl-layout__header">
    <div class="mdl-layout__header-row">
      <span class="mdl-layout__title">CoinTop</span>
      <div class="mdl-layout-spacer"></div>
      <nav class="mdl-navigation">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
          Add New Exchange
        </button>
      </nav>
    </div>
  </header>
  <main class="mdl-layout__content">
    <div
      v-if="isLoading"
      class="app-progress mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    <router-view></router-view>
  </main>
</div>
</template>

<style lang="scss">
.app-header  {
  background-image: url(/static/logo.png);
  background-repeat: no-repeat;
  background-size: 48px 37px;
  background-position: 20px 13px;
}

.app-progress {
  width: 100%;
}
</style>

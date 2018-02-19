<script>
import { mapState } from 'vuex';
import AppHeader from './components/AppHeader';
import AddExchangeModal from './components/AddExchangeModal';

export default {
  name: 'CoinTop',
  components: {
    AppHeader,
    AddExchangeModal,
  },
  computed: {
    ...mapState([
      'isLoading',
    ]),
  },
};
</script>

<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <app-header />
    <main class="mdl-layout__content">
      <div
        v-if="isLoading"
        class="app-progress mdl-progress mdl-js-progress mdl-progress__indeterminate"
      ></div>
      <add-exchange-modal />
      <router-view></router-view>
    </main>
    <div class="mdl-snackbar mdl-js-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button type="button" class="mdl-snackbar__action"></button>
    </div>
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

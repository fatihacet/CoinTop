<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import credentialService from '../services/credentials';
import notification from '../utils/notifications';

export default {
  data() {
    return {
      exchange: '!',
      credentials: {},
    };
  },
  computed: {
    ...mapState([
      'exchangesList',
      'isAddExchangeModalVisible',
    ]),
    ...mapGetters([
      'exchangesByKey',
    ]),
    isCredentialsEntered() {
      const { apiKey, secret } = this.credentials;

      return this.exchange !== '!' && apiKey && secret;
    },
    exchangeFields() {
      const exchange = this.exchangesByKey[this.exchange] || {};

      return exchange.fields;
    },
  },
  methods: {
    ...mapActions([
      'toggleAddExchangeModal',
      'fetchConfiguredExchanges',
    ]),
    cancel() {
      this.toggleAddExchangeModal();
      this.exchange = '!';
      this.credentials = {};
    },
    async save() {
      try {
        await credentialService.saveCredential(this.exchange, this.credentials);
        notification.show('Credential saved!');
        this.cancel(); // to close and revert state
        this.fetchConfiguredExchanges();
      } catch (e) {
        notification.show('Failed to save credential.');
      }
    },
  },
};
</script>

<template>
  <dialog
    v-show="isAddExchangeModalVisible"
    class="exchange-modal mdl-dialog"
    open
  >
    <h4 class="mdl-dialog__title">Add new exchange</h4>
    <div class="mdl-dialog__content">
      <p>
        You can select an exchange and add required credentials to allow CoinTop to fetch your balance and display it.
      </p>
      <p>
        <i>Important: Make sure that your API key only has <strong>read access.</strong></i>
      </p>
      <form action="#">
        <div class="mdl-selectfield mdl-js-selectfield">
          <select
            v-model="exchange"
            class="mdl-selectfield__select">
            <option value="!">Select an exchange</option>
            <option
              v-for="exchange in exchangesList"
              :key="exchange.key"
              :value="exchange.key"
            >
              {{exchange.name}}
            </option>
          </select>
        </div>
        <div v-if="exchangeFields">
          <div
            v-for="field in exchangeFields"
            :key="field.name"
            class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
          >
            <input
              :type="field.type"
              :id="field.name"
              :placeholder="field.label"
              v-model="credentials[field.name]"
              class="mdl-textfield__input"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="mdl-dialog__actions">
      <button
        @click="save"
        :disabled="!isCredentialsEntered"
        type="button"
        class="mdl-button"
      >
        Save
      </button>
      <button
        @click="cancel"
        type="button"
        class="mdl-button"
      >
        Cancel
      </button>
    </div>
  </dialog>
</template>

<style lang="scss">
.exchange-modal {
  width: 600px;
  margin-top: 150px;

  .mdl-selectfield,
  .mdl-textfield,
  table {
    width: 100%;
  }

  input {
    outline: none;
  }
}
</style>

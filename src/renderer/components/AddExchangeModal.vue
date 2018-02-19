<script>
import { mapState, mapActions } from 'vuex';
import exchanges from '../config/exchanges';
import credentialService from '../services/credentials';

export default {
  data() {
    return {
      exchange: '!',
      credentials: {},
    };
  },
  computed: {
    ...mapState([
      'isAddExchangeModalVisible',
    ]),
    isCredentialsEntered() {
      const { key, secret } = this.credentials;

      return this.exchange !== '!' && key && secret;
    },
    exchangeFields() {
      const exchange = exchanges.find(ex => ex.key === this.exchange);

      return exchange ? exchange.fields : null;
    },
  },
  methods: {
    ...mapActions([
      'toggleAddExchangeModal',
    ]),
    cancel() {
      this.toggleAddExchangeModal();
      this.exchange = '!';
      this.credentials = {};
    },
    async save() {
      try {
        await credentialService.saveCredential(this.exchange, this.credentials);
      } catch(e) {

      }
    },
  },
  created() {
    this.exchanges = exchanges;
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
              v-for="exchange in exchanges"
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
  .mdl-textfield {
    width: 100%;
  }

  input {
    outline: none;
  }
}
</style>

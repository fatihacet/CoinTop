<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import credentialService from '../services/credentials';
import notification from '../utils/notifications';

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    ...mapState([
      'isManageExchangesModalVisible',
      'configuredExchanges',
    ]),
    ...mapGetters([
      'exchangesByKey',
    ]),
  },
  methods: {
    ...mapActions([
      'toggleAddExchangeModal',
      'toggleManageExchangesModal',
      'fetchConfiguredExchanges',
    ]),
    add() {
      this.toggleManageExchangesModal();
      this.toggleAddExchangeModal();
    },
    close() {
      this.toggleManageExchangesModal();
    },
    async fetch() {
      this.isLoading = true;
      await this.fetchConfiguredExchanges();
      this.isLoading = false;
    },
    async remove(credential) {
      try {
        await credentialService.removeCredential(credential);
      } catch (e) {
        notification.show('Failed to remove configuration.');
      }

      this.fetch();
    },
  },
  async mounted() {
    await this.fetch();
  },
};
</script>

<template>
  <dialog
    v-show="isManageExchangesModalVisible"
    class="exchange-modal mdl-dialog"
    open
  >
    <h4 class="mdl-dialog__title">Configured exchanges</h4>
    <div class="mdl-dialog__content">
      <p>
        Below you can see your configured exchanges. For security reasons you cannot update exchange configuration. To update an exchange key/secret, please remove it first and add again.
      </p>
      <div
        v-if="isLoading"
        class="spinner-container"
      >
        <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
        <p>Fetching configurations...</p>
      </div>
      <table
        v-if="!isLoading && configuredExchanges.length"
        class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
          <tr>
            <th class="mdl-data-table__cell--non-numeric">Exchange</th>
            <th class="mdl-data-table__cell--non-numeric">Key</th>
            <th class="mdl-data-table__cell--non-numeric">Secret</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="exchange in configuredExchanges"
            :key="exchange.account"
          >
            <td class="mdl-data-table__cell--non-numeric">
              {{exchangesByKey[exchange.account].name}}
            </td>
            <td class="mdl-data-table__cell--non-numeric">
              <span class="apikey">
                {{JSON.parse(exchange.password).apiKey}}
              </span>
            </td>
            <td class="mdl-data-table__cell--non-numeric">
              ********
            </td>
            <td>
              <i
                @click="remove(exchange.account)"
                class="material-icons"
              >
                delete_forever
              </i>
            </td>
          </tr>
        </tbody>
      </table>
      <p
        v-if="!isLoading && !configuredExchanges.length"
        class="no-text"
      >
        <strong>You don't have any configured exchange.</strong>
        <button
          @click="add"
          type="button"
          class="mdl-button mdl-button--accent"
        >
          Add new exchange
        </button>
      </p>
    </div>

    <div class="mdl-dialog__actions">
      <button
        @click="close"
        type="button"
        class="mdl-button"
      >
        Close
      </button>
      <button
        @click="add"
        type="button"
        class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
      >
        Add Exchange
      </button>
    </div>
  </dialog>
</template>

<style lang="scss">
.exchange-modal {
  .spinner-container {
    text-align: center;

    p {
      margin: 10px 0 0;
    }
  }

  .apikey {
    width: 250px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 3px;
  }

  .no-text {
    margin: 30px auto 0;
    text-align: center;

    strong {
      display: block;
      margin-bottom: 10px;
    }
  }

  td i {
    cursor: pointer;
  }
}
</style>

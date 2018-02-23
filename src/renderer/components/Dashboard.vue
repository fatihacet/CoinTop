<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'balances',
      'totalBalance',
    ]),
  },
  created() {
    this.iconRoot = 'https://rawgit.com/cjdowner/cryptocurrency-icons/master/128';
  },
  methods: {
    iconErrorHandler(e) {
      e.target.classList.add('no-icon');
    },
  },
};
</script>

<template>
  <div class="dashboard">
    <table
      v-for="(exchange, key) in balances"
      :key="key"
      class="mdl-data-table mdl-js-data-table mdl-shadow--2dp"
    >
      <tr>
        <th class="mdl-data-table__cell--non-numeric" colspan="5">
          <h4>{{exchange.name}}</h4>
          <span>({{exchange.coins.length}} coins)</span>
          <h4 class="total">Total: {{exchange.total.toFixed(2)}} USD</h4>
        </th>
      </tr>
      <tr>
        <th class="icon-cell"></th>
        <th class="mdl-data-table__cell--non-numeric">Coin</th>
        <th class="mdl-data-table__cell--non-numeric">Amount</th>
        <th class="mdl-data-table__cell--non-numeric">Price</th>
        <th class="mdl-data-table__cell--non-numeric">Total</th>
      </tr>
      <tr
        v-for="coin in exchange.coins"
        :key="coin.symbol"
      >
        <td>
          <img
            :src="`${iconRoot}/color/${coin.name.toLowerCase()}.png`"
            @error="iconErrorHandler"
            width="36"
          />
        </td>
        <td class="mdl-data-table__cell--non-numeric">
          <span class="coin">{{coin.name}}</span>
          </br>
          <span class="symbol">
            {{coin.symbol}}
          </span>
        </td>
        <td class="mdl-data-table__cell--non-numeric">
          {{coin.amount}}
        </td>
        <td class="mdl-data-table__cell--non-numeric">
          {{coin.usdPrice || coin.price}}
        </td>
        <td class="mdl-data-table__cell--non-numeric">
          {{coin.total}} USD
        </td>
      </tr>
    </table>
    <h4 class="portfolio-total">Porfolio Total: {{totalBalance}} USD</h4>
  </div>
</template>

<style lang="scss">
.dashboard {
  table {
    width: 90%;
    margin: 3% 5%;

    h4 {
      margin-bottom: 0;
      display: inline-block;

      + span {
        font-size: 14px;
        position: relative;
        top: -2px;
        left: 3px;
      }
    }

    .total {
      position: absolute;
      right: 24px;
      top: 0;
    }
  }

  .no-icon {
    display: none;
  }

  .icon-cell {
    width: 54px;
  }

  .coin {
    font-size: 14px;
  }

  .symbol {
    font-size: 11px;
    color: rgba(0,0,0,.54);
  }

  .portfolio-total {
    margin: 3% 5%;
    text-align: right;
    color: rgba(0,0,0,.54);
  }
}
</style>

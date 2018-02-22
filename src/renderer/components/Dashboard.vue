<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'balances',
      'balancesTotal',
    ]),
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
        <th class="mdl-data-table__cell--non-numeric" colspan="4">
          <h4>{{exchange.name}}</h4> <span>({{exchange.coins.length}} coins)</span>
          <h5>Total: {{exchange.total.toFixed(2)}} USD</h5>
        </th>
      </tr>
      <tr>
        <th class="mdl-data-table__cell--non-numeric">Name</th>
        <th class="mdl-data-table__cell--non-numeric">Amount</th>
        <th class="mdl-data-table__cell--non-numeric">Price</th>
        <th class="mdl-data-table__cell--non-numeric">Total</th>
      </tr>
      <tr
        v-for="coin in exchange.coins"
        :key="coin.symbol"
      >
        <td class="mdl-data-table__cell--non-numeric">{{coin.symbol}}</td>
        <td class="mdl-data-table__cell--non-numeric">{{coin.amount}}</td>
        <td class="mdl-data-table__cell--non-numeric">{{coin.usdPrice || coin.price}}</td>
        <td class="mdl-data-table__cell--non-numeric">{{coin.total}}</td>
      </tr>
    </table>
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

    h5 {
      position: absolute;
      right: 24px;
      top: 0;
    }
  }
}
</style>

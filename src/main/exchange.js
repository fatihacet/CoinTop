/* eslint-disable */

const ccxt = require('ccxt');
const keys = {}

const cex = new ccxt.cex(keys.cex);
const bittrex = new ccxt.bittrex(keys.bittrex);
const binance = new ccxt.binance(keys.binance);
const portfolio = {};

async function fetch(exchange) {
  const balance = await exchange.fetchBalance();
  const tickers = await exchange.fetchTickers();

  return findCoins(exchange, balance, tickers);
}

async function fetchBalances() {
  const cexWallet = await fetch(cex);
  const bittrexWallet = await fetch(bittrex);
  const binanceWallet = await fetch(binance);

  portfolio.total = calculateTotal();
  return portfolio;
}

const calculateTotal = (wallets) => {
  let total = 0;

  Object.values(portfolio).forEach((exchange) => {
    let exchangeTotal = 0;

    exchange.coins.forEach((coin) => {
      exchangeTotal += parseFloat(coin.total, 10);
    });

    exchange.total = exchangeTotal;
    total += exchangeTotal;
  });

  return total;
}

const getSymbol = (coin, exchange) => {
  if (coin === 'USD' || coin === 'EUR' || coin === 'USDT') {
    return coin;
  } else if (coin === 'BTC') {
    if (exchange === cex) {
      return 'BTC/USD';
    } else {
      return 'BTC/USDT';
    }
  }

  return `${coin}/BTC`;
}

const calculatePrice = (symbol, price, amount, tickers) => {
  const usdPrice = tickers['BTC/USDT'] ? tickers['BTC/USDT'].ask : tickers['BTC/USD'].ask;

  if (symbol.indexOf('USD') > -1 || symbol.indexOf('EUR') > -1 || symbol.indexOf('USDT') > -1) {
    if (symbol === 'BTC/USD' || symbol === 'BTC/USDT') {
      return (amount * usdPrice).toFixed(2);
    }

    return (price * amount).toFixed(2);
  }

  return (price * amount * usdPrice).toFixed(2);
}

const findCoins = (exchange, balance, tickers) => {
  for (var coin in balance.total) {
    const exchangeName = exchange.name;
    const amount = balance.total[coin];

    portfolio[exchangeName] = portfolio[exchangeName] || {
      name: exchangeName,
      coins: [],
    };

    if (amount > 0) {
      const symbol = getSymbol(coin, exchangeName);
      const price = tickers[symbol] ? tickers[symbol].ask : amount;
      const total = calculatePrice(symbol, price, amount, tickers);

      if (parseFloat(total, 10) > 10) { // Only show coins worth more than 10 USD
        const coinData = {
          name: coin, symbol, price, amount, total,
        }

        // FIXME
        const usdPrice = tickers['BTC/USDT'] ? tickers['BTC/USDT'].ask : tickers['BTC/USD'].ask;
        if (symbol.indexOf('USD') > -1 || symbol.indexOf('EUR') > -1 || symbol.indexOf('USDT') > -1) {
          if (symbol === 'BTC/USD' || symbol === 'BTC/USDT') {
            coinData.usdPrice = usdPrice;
          }
        }

        portfolio[exchangeName].coins.push(coinData);
      }
    }
  }
}

export default { fetchBalances };

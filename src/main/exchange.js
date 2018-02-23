/* eslint-disable */

const ccxt = require('ccxt');
let cex = null;
let bittrex = null;
let binance = null;
let portfolio = {};

async function fetch(exchange) {
  const balance = await exchange.fetchBalance();
  const tickers = await exchange.fetchTickers();

  return findCoins(exchange, balance, tickers);
}

async function fetchBalances(keys) {
  portfolio = {};
  if (keys.cex) {
    try {
      cex = new ccxt.cex(keys.cex);
      const cexWallet = await fetch(cex);
    } catch (e) {
      console.log('Failed to fetch Cex', e);
    }
  }

  if (keys.bittrex) {
    try {
      bittrex = new ccxt.bittrex(keys.bittrex);
      const bittrexWallet = await fetch(bittrex);
    } catch (e) {
      console.log('Failed to fetch Bittrex', e);
    }
  }

  if (keys.binance) {
    try {
      binance = new ccxt.binance(keys.binance);
      const binanceWallet = await fetch(binance);
    } catch (e) {
      console.log('Failed fetch Binance', e);
    }
  }

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

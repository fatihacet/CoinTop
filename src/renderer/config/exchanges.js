export default [
  {
    name: 'Binance',
    key: 'binance',
    urlSchema: 'https://binance.com/trade.html?symbol={{from}}_{{to}}',
    fields: [
      {
        name: 'apiKey',
        type: 'text',
        label: 'API Key',
      },
      {
        name: 'secret',
        type: 'password',
        label: 'API Secret',
      },
    ],
  },
  {
    name: 'Bittrex',
    key: 'bittrex',
    urlSchema: 'https://bittrex.com/Market/Index?MarketName={{to}}-{{from}}',
    fields: [
      {
        name: 'apiKey',
        type: 'text',
        label: 'API Key',
      },
      {
        name: 'secret',
        type: 'password',
        label: 'API Secret',
      },
    ],
  },
  {
    name: 'Cex.io',
    key: 'cex',
    urlSchema: 'https://cex.io/trade/{{from}}-{{to}}',
    fields: [
      {
        name: 'uid',
        type: 'text',
        label: 'Cex.io User Id',
      },
      {
        name: 'apiKey',
        type: 'text',
        label: 'API Key',
      },
      {
        name: 'secret',
        type: 'password',
        label: 'API Secret',
      },
    ],
  },
];

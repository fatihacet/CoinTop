const keytar = require('keytar');
const APP_NAME = 'CoinTop';

export default {
  async setCredential(exchange, credentials) {
    await keytar.setPassword(APP_NAME, exchange, JSON.stringify(credentials));
  },
  async getCredential(exchange) {
    const credential = await keytar.getPassword(APP_NAME, exchange);

    if (credential) {
      return JSON.parse(credential);
    }

    return null;
  },
  async getCredentials() {
    return keytar.findCredentials(APP_NAME);
  },
};

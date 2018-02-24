# <img src="static/app-icons/64x64.png" align="center" /> CoinTop

CoinTop is a desktop app to track your crypto portfolio on multiple exchanges in realtime. Add your **read only** API keys and enjoy!

Currently supported exchanges are Binance.com, Bittrex.com and Cex.io. CoinTop uses [ccxt](https://github.com/ccxt/ccxt/) to connect the exchanges and technically it should be easy to support new changes in next versions.


### Security

CoinTop uses [keytar](https://github.com/atom/node-keytar) from GitHub's Atom team and on macOS the credentials are managed by the Keychain, on Linux they are managed by the Secret Service API/libsecret, and on Windows they are managed by Credential Vault.


### Important

Please make sure that your API keys only have **read access**. Using read only API keys, it is impossible for CoinTop to change any data on your behalf on the exchanges you added.


### Disclaimer

Cointop is currently on development and may contain bugs. It may not work at all. If you want to contribute CoinTop, please open an issue to report issues you have. Feel free to create an issue for feature requests. Thank you for your feedbacks.

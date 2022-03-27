const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC,
          },
          providerOrUrl: `https://ropsten.infura.io/v3/${keys.INFURA_PROJECT_ID}`, // ropsten.infura.io/v3/7835fbff97fe48589733a38dc18a5634
          addressIndex: 0,
        }),
      network_id: 3,
      gas: 5500000, // Gas Limit to spend
      gasPrice: 20000000000, // unit of gas
      confirmation: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, // number of blocks before deployment times out
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
};

// gas * gasPrice = 5500000 * 20000000000 = 110000000000000000 (1,1e+17) = 0.11 ETH = 346.10 USD

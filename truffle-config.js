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

// Random Example from https://etherscan.io/

// Base Fee (determind by ethereum) => 14.725152629 Gwei
// Max Priority Gas Fee => 2 Gwei
// Gas Price = Base Fee + Max Priority Gas Fee = 16.725152629 Gwei
// Gas Used = 21000
// Transaction Fee = Gas Used * Gas Price = 351, 228.205209 Gwei (0.000351228205209 Eth)

// Burnt Fee => Base Fee * Gas Used = 0.000309228205209 Eth

// Rest To Miner => Max Priority Gas Fee * Gas Used = 42000 Gwei

//curl https://ropsten.infura.io/v3/7835fbff97fe48589733a38dc18a5634 \
//-X POST \
//-H "Content-Type: application/json" \
//-d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'

// const instance = await CourseMarketplace.deployed()

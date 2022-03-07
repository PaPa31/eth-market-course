module.exports = {
  networks: {
    contract_build_directory: "./public/contracts",
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",
    },
  },
};
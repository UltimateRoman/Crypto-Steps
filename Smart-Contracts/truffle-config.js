const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
//const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    mumbai: {
      provider: () => new HDWalletProvider(mnemonic, "https://matic-mumbai.chainstacklabs.com/"),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },

  contracts_build_directory: './abis/',
  compilers: {
    solc: {
      version: "0.8.2",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

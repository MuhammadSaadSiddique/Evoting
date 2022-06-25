require("dotenv").config()
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {

  networks: {
    
    
    rinkeby: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY_1],
        providerOrUrl: process.env.INFURA_API_URL,
        numberOfAddresses: 1
      }),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      networkCheckTimeout: 1000000,
      timeoutBlocks: 200,
      skipDryRun: true
    }

  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
};

const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");
const kovanProvider = new HDWalletProvider(
  "2D8330C127BDA2E12B0032D1A3B2BEEDF67C3275690FCFBCF5EE45DD90873F4E",
  "https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc?apiKey=69bbfd65cae84e6bae3c62c2bde588c6");

const mainnetProvider = new HDWalletProvider(
  process.env.MAINNET_KEY,
  "https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc?apiKey=69bbfd65cae84e6bae3c62c2bde588c6");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: 5777
    },
    kovan: {
      network_id: 42,
      provider: () => kovanProvider
    },
    mainnet: {
      network_id: 1,
      provider: () => mainnetProvider,
      gasPrice: 2900000000
    }
  },
  plugins: [ "truffle-security" ]
};

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-mumbai.infura.io/v3/" + process.env.INFURA_KEY,
      },
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: [PRIVATE_KEY, ],
    },
    mnt: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [PRIVATE_KEY, ],
    },
    scroll: {
      url: "https://scroll-sepolia.blockpi.network/v1/rpc/public",
      accounts: [PRIVATE_KEY, ],
    },
    file: {
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [PRIVATE_KEY, ],
    },
  },
  etherscan: {
    // apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
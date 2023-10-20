require("@nomicfoundation/hardhat-toolbox");

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
        url: "https://polygon-mumbai.infura.io/v3/b2772de7df134490afb47e1f8dd18ea2",
      },
    },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/b2772de7df134490afb47e1f8dd18ea2",
    },
  },
  etherscan: {
    // apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};
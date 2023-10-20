const {
    ethers
  } = require("hardhat");
  
  async function deployToken(name, symbol, decimals) {
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy(name, symbol, decimals);
  
    console.log(`${symbol} address: ${testToken.address}`);
  }
  
  async function deployBridgeMookup() {
    const BridgeMookup = await ethers.getContractFactory("BridgeMookup");
    const bridgeMookup = await BridgeMookup.deploy();
  
    console.log("BridgeMookup address:", bridgeMookup.address);
  }
  
  async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    await deployToken("USD Circle", "USDC", 6);
    await deployToken("Ethereum", "ETH", 18);
  
    await deployBridgeMookup();
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
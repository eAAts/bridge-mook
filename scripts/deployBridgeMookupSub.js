const {
    ethers
} = require("hardhat");

let bridgeMookupAddress;

async function deployBridgeMookup() {
    const BridgeMookup = await ethers.getContractFactory("BridgeMookup");
    const bridgeMookup = await BridgeMookup.deploy();

    bridgeMookupAddress = bridgeMookup.address;

    console.log("BridgeMookup address:", bridgeMookup.address);
}

async function deployBridgeToken(name, symbol, decimals) {
    const BridgeToken = await ethers.getContractFactory("BridgeToken");
    const bridgeToken = await BridgeToken.deploy(name, symbol, decimals, bridgeMookupAddress);

    console.log(`${symbol} address: ${bridgeToken.address}`);
}

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    await deployBridgeMookup();
    await deployBridgeToken("eAAts USDC", "eUSDC", 6);
    await deployBridgeToken("eAAts Ether", "eETH", 18);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
const {
    ethers
} = require("hardhat");
require("dotenv").config();

const config = require("../config/index");

async function deployBridgeMookup(signer) {
    const BridgeMookup = await ethers.getContractFactory("BridgeMookup", signer);
    const bridgeMookup = await BridgeMookup.deploy();
    await bridgeMookup.deployed();

    return bridgeMookup.address;
}

async function deployToken(signer, name, symbol, decimals) {
    const TestToken = await ethers.getContractFactory("TestToken", signer);
    const testToken = await TestToken.deploy(name, symbol, decimals, );
    await testToken.deployed();

    return testToken.address;
}

async function deployBridgeToken(signer, name, symbol, decimals, bridgeMookupAddress) {
    const BridgeToken = await ethers.getContractFactory("BridgeToken", signer);
    const bridgeToken = await BridgeToken.deploy(name, symbol, decimals, bridgeMookupAddress, );
    await bridgeToken.deployed();

    return bridgeToken.address;
}

async function main() {
    const deploySource = async (URL) => {
        const signer = await getSigner(URL);

        const bridgeMookupAddress = await deployBridgeMookup(signer);
        console.log("BridgeMookup address:", bridgeMookupAddress);

        const sourceUSDCAddress = await deployToken(signer, "ETHGlobal USD Circle", "USDC", 6);
        console.log(`USDC address: ${sourceUSDCAddress}`);
        const sourceETHAddress = await deployToken(signer, "ETHGlobal Ethereum", "ETH", 18);
        console.log(`ETH address: ${sourceETHAddress}`);
    }

    const deployTarget = async (URL) => {
        const signer = await getSigner(URL);

        const bridgeMookupAddress = await deployBridgeMookup(signer);
        console.log("BridgeMookup address:", bridgeMookupAddress);

        const sourceUSDCAddress = await deployBridgeToken(signer, "eAAts USDC", "eUSDC", 6, bridgeMookupAddress);
        console.log(`USDC address: ${sourceUSDCAddress}`);
        const sourceETHAddress = await deployBridgeToken(signer, "eAAts Ether", "eETH", 18, bridgeMookupAddress);
        console.log(`ETH address: ${sourceETHAddress}`);
    }

    const getSigner = async (URL) => {
        const provider = new ethers.providers.JsonRpcProvider(URL);
        // const provider = ethers.provider;
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        return signer
    }

    // console.log("1. deploy polygon chain");
    // const URL_POLYGON = config.polygon.url + process.env.INFURA_KEY;
    // await deploySource(URL_POLYGON);

    console.log("2. deploy mantle chain");
    const URL_MANTLE = config.mantle.url;
    await deployTarget(URL_MANTLE);

    console.log("3. deploy scroll chain");
    const URL_SCROLL = config.scroll.url;
    await deployTarget(URL_SCROLL);

    console.log("4. deploy filecoin chain");
    const URL_FILECOIN = config.filecoin.url;
    await deployTarget(URL_FILECOIN);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
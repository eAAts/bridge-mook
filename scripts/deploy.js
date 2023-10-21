const {
    ethers
} = require("hardhat");
require("dotenv").config();

const config = require("../config/index");

async function deployBridgeMookup(signer) {
    const BridgeMookup = await ethers.getContractFactory("BridgeMookup", signer);
    const bridgeMookup = await BridgeMookup.deploy();

    return bridgeMookup.address;
}

async function deployToken(signer, name, symbol, decimals) {
    const TestToken = await ethers.getContractFactory("TestToken", signer);
    const testToken = await TestToken.deploy(name, symbol, decimals);

    return testToken.address;
}

async function deployBridgeToken(signer, name, symbol, decimals, bridgeMookupAddress) {
    const BridgeToken = await ethers.getContractFactory("BridgeToken", signer);
    const bridgeToken = await BridgeToken.deploy(name, symbol, decimals, bridgeMookupAddress);
    
    return bridgeToken.address;
}

async function main() {
    const deploySource = async (URL) => {
        const signer = await getSigner(URL);
        
        const bridgeMookupAddress = await deployBridgeMookup(signer);
        console.log("BridgeMookup address:", bridgeMookupAddress);
        
        const sourceUSDCAddress = await deployToken(signer, "USD Circle", "USDC", 6);
        console.log(`USDC address: ${sourceUSDCAddress}`);
        const sourceETHAddress = await deployToken(signer, "Ethereum", "ETH", 18);
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

    console.log("1. deploy mumbai chain");
    const URL_MUMBAI = config.mumbai.url + process.env.INFURA_KEY;
    await deploySource(URL_MUMBAI);
    
    console.log("2. deploy mantle chain");
    const URL_MANTLE = config.mnt.url;
    await deployTarget(URL_MANTLE);

    console.log("3. deploy scroll chain");
    const URL_SCROLL = config.scroll.url;
    await deployTarget(URL_SCROLL);
    
    console.log("4. deploy file chain");
    const URL_FILE = config.file.url;
    await deployTarget(URL_FILE);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
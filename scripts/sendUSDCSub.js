const {
    ethers
} = require("hardhat");
const config = require("../config/index");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    
    const amount = "100" + "0".repeat(6);

    const usdc = await ethers.getContractAt("TestToken", config.mnt.eUSDC);
    tx = await usdc.approve(config.mnt.BridgeMookup, amount);
    await tx.wait();
    console.log("approve hash:", tx.hash);

    const bridgeMookup = await ethers.getContractAt("BridgeMookup", config.mnt.BridgeMookup);
    tx = await bridgeMookup.sendTokens(
        config.mnt.eUSDC,
        deployer.address,
        amount,
        5001
    );
    await tx.wait();
    console.log("sendTokens hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
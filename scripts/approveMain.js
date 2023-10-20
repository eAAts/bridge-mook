const {
    ethers
} = require("hardhat");
const config = require("../config/index");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const bridgeMookup = await ethers.getContractAt("BridgeMookup", config.mumbai.BridgeMookup);
    tx = await bridgeMookup.approveToken(config.mumbai.USDC, config.mnt.eUSDC, false);
    await tx.wait();
    console.log("approveToken hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
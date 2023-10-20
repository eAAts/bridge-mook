const {
    ethers
} = require("hardhat");
const config = require("../config/index");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const bridgeMookup = await ethers.getContractAt("BridgeMookup", config.mnt.BridgeMookup);
    tx = await bridgeMookup.approveToken(config.mnt.eUSDC, config.mumbai.USDC, true);
    await tx.wait();
    console.log("approveToken hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
const {
    ethers
} = require("hardhat");
const config = require("../config/index");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const amount = "100" + "0".repeat(6);

    const usdc = await ethers.getContractAt("TestToken", config.mnt.eUSDC);
    tx = await usdc.transfer("0x251c5d3ebd1A25B4F8ea318266c72F64dd4d6301", amount);
    await tx.wait();
    console.log("transfer hash:", tx.hash);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
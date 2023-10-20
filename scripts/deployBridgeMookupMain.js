const {
    ethers
} = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const BridgeMookup = await ethers.getContractFactory("BridgeMookup");
    const bridgeMookup = await BridgeMookup.deploy();

    console.log("BridgeMookup address:", bridgeMookup.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
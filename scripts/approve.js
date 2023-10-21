const {
    ethers
} = require("hardhat");
const config = require("../config/index");


async function main() {
    const approveSource = async (
        URL,
        bridgeAddress,
        sourceAddress,
        targetAddress
    ) => {
        const signer = await getSigner(URL);

        const bridgeMookup = await ethers.getContractAt("BridgeMookup", bridgeAddress);
        tx = await bridgeMookup.connect(signer).approveToken(sourceAddress, targetAddress, false);
        await tx.wait();
        console.log("approveSource hash:", tx.hash);
    }

    const approveTarget = async (
        URL,
        bridgeAddress,
        sourceAddress,
        targetAddress
    ) => {
        const signer = await getSigner(URL);

        const bridgeMookup = await ethers.getContractAt("BridgeMookup", bridgeAddress);
        tx = await bridgeMookup.connect(signer).approveToken(sourceAddress, targetAddress, true);
        await tx.wait();
        console.log("approveTarget hash:", tx.hash);
    }

    const getSigner = async (URL) => {
        const provider = new ethers.providers.JsonRpcProvider(URL);
        // const provider = ethers.provider;
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        return signer
    }

    console.log("1. approve mumbai assets");
    const URL_MUMBAI = config.mumbai.url + process.env.INFURA_KEY;
    await approveSource(URL_MUMBAI, config.mumbai.BridgeMookup, config.mumbai.USDC, config.mantle.USDC);
    await approveSource(URL_MUMBAI, config.mumbai.BridgeMookup, config.mumbai.USDC, config.scroll.USDC);
    await approveSource(URL_MUMBAI, config.mumbai.BridgeMookup, config.mumbai.USDC, config.filecoin.USDC);
    
    await approveSource(URL_MUMBAI, config.mumbai.BridgeMookup, config.mumbai.ETH, config.mantle.ETH);
    await approveSource(URL_MUMBAI, config.mumbai.BridgeMookup, config.mumbai.ETH, config.scroll.ETH);
    await approveSource(URL_MUMBAI, config.mumbai.BridgeMookup, config.mumbai.ETH, config.filecoin.ETH);
    
    console.log("2. approve mantle assets");
    const URL_MANTLE = config.mantle.url;
    await approveTarget(URL_MANTLE, config.mantle.BridgeMookup, config.mantle.USDC, config.mumbai.USDC);

    await approveTarget(URL_MANTLE, config.mantle.BridgeMookup, config.mantle.ETH, config.mumbai.ETH);
    
    console.log("3. approve scroll assets");
    const URL_SCROLL = config.scroll.url;
    await approveTarget(URL_SCROLL, config.scroll.BridgeMookup, config.scroll.USDC, config.mumbai.USDC);

    await approveTarget(URL_SCROLL, config.scroll.BridgeMookup, config.scroll.ETH, config.mumbai.ETH);
    
    console.log("4. approve filecoin assets");
    const URL_FILECOIN = config.filecoin.url;
    await approveTarget(URL_FILECOIN, config.filecoin.BridgeMookup, config.filecoin.USDC, config.mumbai.USDC);

    await approveTarget(URL_FILECOIN, config.filecoin.BridgeMookup, config.filecoin.ETH, config.mumbai.ETH);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
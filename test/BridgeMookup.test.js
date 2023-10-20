const {
  ethers
} = require("hardhat");
const {
  expect
} = require("chai");

describe("BridgeMookup", function () {
  let testToken, bridgeToken, sourceBridgeMookup, targetBridgeMookup;
  let owner, user1, user2, user3, recipient;

  before(async function () {
    [owner, user1, user2, user3, recipient] = await ethers.getSigners();

    const TestToken = await ethers.getContractFactory("TestToken");
    testToken = await TestToken.deploy("TestToken", "TTK", 18);
    await testToken.deployed();

    const SourceBridgeMookup = await ethers.getContractFactory("BridgeMookup");
    sourceBridgeMookup = await SourceBridgeMookup.deploy();
    await sourceBridgeMookup.deployed();

    const TargetBridgeMookup = await ethers.getContractFactory("BridgeMookup");
    targetBridgeMookup = await TargetBridgeMookup.deploy();
    await targetBridgeMookup.deployed();

    const BridgeToken = await ethers.getContractFactory("BridgeToken");
    bridgeToken = await BridgeToken.deploy("BridgeToken", "BTK", 18, targetBridgeMookup.address);
    await bridgeToken.deployed();
  });

  it("should approve token", async function () {
    await sourceBridgeMookup.approveToken(testToken.address, bridgeToken.address, false);
    await targetBridgeMookup.approveToken(bridgeToken.address, testToken.address, true);
  });

  it("should mint tokens to users", async function () {
    await testToken.connect(user1).mint(user1.address, ethers.utils.parseEther("1000"));
    await testToken.connect(user2).mint(user2.address, ethers.utils.parseEther("2000"));
    await testToken.connect(user3).mint(user3.address, ethers.utils.parseEther("3000"));

    expect(await testToken.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("1000"));
    expect(await testToken.balanceOf(user2.address)).to.equal(ethers.utils.parseEther("2000"));
    expect(await testToken.balanceOf(user3.address)).to.equal(ethers.utils.parseEther("3000"));
  });

  it("should handle token bridging", async function () {
    await testToken.connect(user1).approve(sourceBridgeMookup.address, ethers.utils.parseEther("100"));
    await sourceBridgeMookup.connect(user1).sendTokens(testToken.address, recipient.address, ethers.utils.parseEther("100"), 1);

    expect(await testToken.balanceOf(user1.address)).to.equal(ethers.utils.parseEther("900"));
    expect(await testToken.balanceOf(sourceBridgeMookup.address)).to.equal(ethers.utils.parseEther("100"));
  })

  it("should handle receiving tokens on target bridge", async function () {
    const currentTransferId = await sourceBridgeMookup.currentTransferId();
    const processedId = await sourceBridgeMookup.processedId();

    expect(processedId).to.be.lessThan(currentTransferId);

    for (let i = processedId.add(1); i <= currentTransferId; i++) {
      const transferInfo = await sourceBridgeMookup.transferInfos(i);
      await targetBridgeMookup.receiveTokens(
        transferInfo.targetToken,
        transferInfo.recipient,
        transferInfo.amount
      );
    }

    await targetBridgeMookup.processTransfer(currentTransferId);
    expect(await targetBridgeMookup.processedId()).to.equal(currentTransferId);
    expect(await bridgeToken.balanceOf(recipient.address)).to.equal(ethers.utils.parseEther("100"));
  });
});
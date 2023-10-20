// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./base/TokenManager.sol";
import "./token/BridgeToken.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeMookup is TokenManager {
    event TokensSent(
        address indexed targetToken,
        address indexed recipient,
        uint256 indexed targetChainId,
        uint256 amount
    );
    event TokensReceived(
        address indexed token,
        address indexed recipient,
        uint256 amount
    );

    struct TransferInfo {
        address targetToken;
        address recipient;
        uint256 targetChainId;
        uint256 amount;
    }

    mapping(uint256 => TransferInfo) public transferInfos;
    uint256 public currentTransferId;
    uint256 public processedId;

    function sendTokens(
        address tokenAddress,
        address recipient,
        uint256 amount,
        uint256 targetChainId
    ) external payable {
        if (!isGeneratedToken(tokenAddress)) {
            if (tokenAddress == address(0)) {
                require(msg.value == amount, "Sent ETH value does not match");
            } else {
                IERC20(tokenAddress).transferFrom(
                    msg.sender,
                    address(this),
                    amount
                );
            }
        } else {
            BridgeToken(tokenAddress).burn(msg.sender, amount);
        }

        TransferInfo memory newTransferInfo = TransferInfo({
            targetToken: getTargetToken(tokenAddress),
            recipient: recipient,
            targetChainId: targetChainId,
            amount: amount
        });

        ++currentTransferId;
        transferInfos[currentTransferId] = newTransferInfo;

        emit TokensSent(
            getTargetToken(tokenAddress),
            recipient,
            targetChainId,
            amount
        );
    }

    function receiveTokens(
        address tokenAddress,
        address recipient,
        uint256 amount
    ) external onlyOwner {
        if (!isGeneratedToken(tokenAddress)) {
            if (tokenAddress == address(0)) {
                payable(recipient).transfer(amount);
            } else {
                IERC20(tokenAddress).transfer(recipient, amount);
            }
        } else {
            BridgeToken(tokenAddress).mint(recipient, amount);
        }
        emit TokensReceived(tokenAddress, recipient, amount);
    }

    function processTransfer(uint256 _processedId) external onlyOwner {
        processedId = _processedId;
    }
}

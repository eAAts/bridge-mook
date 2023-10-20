// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BridgeMookup is Ownable {
    event TokensSent(
        address indexed token,
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );

    event TokensReceived(
        address indexed token,
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );

    function sendTokens(
        address tokenAddress,
        address recipient,
        uint256 amount
    ) external payable {
        if (tokenAddress == address(0)) {
            require(msg.value == amount, "Sent ETH value does not match");
            payable(recipient).transfer(amount);
        } else {
            IERC20(tokenAddress).transferFrom(msg.sender, recipient, amount);
        }
        emit TokensSent(tokenAddress, msg.sender, recipient, amount);
    }

    function receiveTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        IERC20(tokenAddress).transfer(msg.sender, amount);
        emit TokensReceived(tokenAddress, msg.sender, address(this), amount);
    }
}

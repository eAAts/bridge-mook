// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenManager is Ownable {
    mapping(address => bool) public approvedTokens;

    event TokenApproved(address indexed token);
    event TokenRevoked(address indexed token);

    function approveToken(address token) external onlyOwner {
        approvedTokens[token] = true;
        emit TokenApproved(token);
    }

    function revokeToken(address token) external onlyOwner {
        approvedTokens[token] = false;
        emit TokenRevoked(token);
    }
}

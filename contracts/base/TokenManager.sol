// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenManager is Ownable {
    struct TokenPair {
        address targetToken;
        bool isGeneratedToken;
    }

    mapping(address => TokenPair) public approvedTokens;

    event TokenApproved(
        address indexed sourceToken,
        address indexed targetToken,
        bool indexed isGeneratedToken
    );
    event TokenRevoked(
        address indexed sourceToken,
        address indexed targetToken
    );

    function approveToken(
        address _sourceToken,
        address _targetToken,
        bool _isGeneratedToken
    ) external onlyOwner {
        approvedTokens[_sourceToken] = TokenPair({
            targetToken: _targetToken,
            isGeneratedToken: _isGeneratedToken
        });

        emit TokenApproved(_sourceToken, _targetToken, _isGeneratedToken);
    }

    function revokeToken(address _sourceToken) external onlyOwner {
        delete approvedTokens[_sourceToken];
        emit TokenRevoked(
            _sourceToken,
            approvedTokens[_sourceToken].targetToken
        );
    }

    function getTargetToken(
        address _sourceToken
    ) external view returns (address) {
        return approvedTokens[_sourceToken].targetToken;
    }

    function isGeneratedToken(
        address _sourceToken
    ) external view returns (bool) {
        return approvedTokens[_sourceToken].isGeneratedToken;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BridgeToken is ERC20, Ownable {
    uint8 private decimals_;
    address public bridge;

    event Mint(address indexed to, uint256 amount);
    event Burn(address indexed from, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        address _bridge
    ) ERC20(_name, _symbol) {
        bridge = _bridge;

        decimals_ = _decimals;
    }

    function mint(address _to, uint256 _amount) external onlyBridge {
        _mint(_to, _amount);
        emit Mint(_to, _amount);
    }

    function burn(address _from, uint256 _amount) external onlyBridge {
        _burn(_from, _amount);
        emit Burn(_from, _amount);
    }

    function mintOnlyOwner(address _to, uint256 _amount) external onlyOwner {
        _mint(_to, _amount);
    }

    function setBridge(address _bridge) external onlyOwner {
        bridge = _bridge;
    }

    function decimals() public view override returns (uint8) {
        return decimals_;
    }

    modifier onlyBridge() {
        require(msg.sender == bridge, "Only bridge can call this function");
        _;
    }
}

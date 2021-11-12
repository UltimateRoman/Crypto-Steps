// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CryptoStepsToken is ERC20, Ownable {
    mapping(address => uint) unclaimedRewards;

    constructor() ERC20("Crypto-Steps Token", "CST") {}

    function increaseUserRewards(uint _amount) external onlyOwner {
        unclaimedRewards[msg.sender] += _amount;
    }

    function withdrawReward() external {
      if(unclaimedRewards[msg.sender] > 0) {
        _mint(msg.sender, unclaimedRewards[msg.sender]);
      }
    }
}


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./CryptoStepsNFT.sol";

contract CryptoStepsToken is ERC20, Ownable {
    address NFTAddress;
    mapping(address => uint) public unclaimedRewards;

    constructor() ERC20("Crypto-Steps Token", "CST") {}

    function setContractAddress( 
        address _NFTAddress
    ) 
        external 
        onlyOwner 
    {
        NFTAddress = _NFTAddress;
    }

    function increaseUserRewards(uint _amount, address _player) external onlyOwner {
      unclaimedRewards[_player] += _amount;
    }

    function withdrawReward(string memory _metadata) external {
      if(unclaimedRewards[msg.sender] > 0) {
        if(unclaimedRewards[msg.sender] > 10 ether) {
          CryptoStepsNFT(NFTAddress).safeMint(msg.sender, _metadata);
        }
        _mint(msg.sender, unclaimedRewards[msg.sender]);
        unclaimedRewards[msg.sender] = 0;
      }
    }
}


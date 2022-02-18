// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "./TemakiToken.sol";

contract TemakiBar is Ownable {
    using SafeMath for uint256;
    //variables
    uint256 public reserve;
    uint256 public pool;
    uint256 public prize;
    uint256 public reservePoolRatio = 2;
    uint256 public temakiEntryPrice = 1000000000000000;
    uint256 public betPrice = 10;
    uint256 public betDifficulty = 1000;
    uint256 public temakiExitPrice;
    TemakiToken public temakiToken;
    address public temakiBarAddress;
    bytes4 private constant SELECTOR =
        bytes4(keccak256(bytes("transfer(address,uint256)")));

    //
    constructor() payable {
        temakiToken = new TemakiToken();
        temakiBarAddress = address(this);
    }

    //deposit
    function deposit() public payable {
        //check value
        require(msg.value >= temakiEntryPrice);
        //variables
        uint256 value = msg.value;
        //send ETH to Reserve and to Pool
        uint256 toReserve = value / reservePoolRatio;
        uint256 toPool = value / reservePoolRatio;
        //calculate the amount of tokens
        uint256 amountTokens = toReserve / temakiEntryPrice;
        //put tokens in reserve and pool
        reserve = reserve + toReserve;
        pool = pool + toPool;
        //update prize
        prize = pool / 2;
        //Mint the tokens and send to buyer
        temakiToken.mint(msg.sender, amountTokens);
        //set new exit price
        temakiExitPrice = reserve / temakiToken.totalSupply();
    }

    //withdraw
    function withdraw(uint256 tokenAmount) public {
        //check if sender has TemakiCoins
        require(
            temakiToken.balanceOf(msg.sender) > 0 ||
                tokenAmount <= temakiToken.balanceOf(msg.sender)
        );
        //get approval
        temakiToken.approve(address(this), tokenAmount);
        //get the ETH from reserve
        uint256 amountEther = tokenAmount * temakiExitPrice;
        //check if reserve has the money to pay out
        require(reserve > amountEther);
        //send ETH from reserve to seller - !CHECK IF COMPLETED!
        (bool sent, bytes memory data) = payable(msg.sender).call{
            value: amountEther
        }("");
        require(sent, "Failed to send Ether");
        //update reserve
        reserve = reserve - amountEther;
        //burn tokens
        temakiToken.burn(msg.sender, tokenAmount);
        //update exit price
        temakiExitPrice = reserve / temakiToken.totalSupply();
    }

    //bet
    function betTemaki(uint256 number) public returns (bool) {
        //check if owner has Temaki Balance
        require(temakiToken.balanceOf(msg.sender) >= betPrice);
        //get approval
        temakiToken.approve(address(this), betPrice);
        //burn betted tokens
        temakiToken.burn(msg.sender, betPrice);
        //roll bet
        uint256 lotteryTicket = random(betDifficulty);
        //adjust exitPrice
        temakiExitPrice = reserve / temakiToken.totalSupply();
        //check if winner
        if (lotteryTicket == number) {
            //winner
            //get pool prize
            //send money to winer - !CHECK IF COMPLETED!
            (bool sent, bytes memory data) = payable(msg.sender).call{
                value: prize
            }("");
            require(sent, "Failed to send Ether");
            //adjust pool
            pool = pool - prize;
            //adjust prize
            prize = pool / 2;
            return true;
        } else {
            return false;
        }
    }

    //SUPPORT FUNCTIONS
    //generate random - !CONNECT CHAIN LINK!
    function random(uint256 number) public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % number;
    }
}

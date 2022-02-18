// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract TemakiToken is ERC20, Ownable {
    using SafeMath for uint256;

    string public _name = "TemakiToken";
    string public _symbol = "TMKT";

    constructor() ERC20(_name, _symbol) {}

    event Mint(address indexed sender, uint256 amount);
    event Burn(address indexed sender, uint256 amount);

    function mint(address buyer, uint256 amount) public onlyOwner {
        _mint(buyer, amount);
        emit Mint(buyer, amount);
    }

    function burn(address burner, uint256 amount) public {
        _burn(burner, amount);
        emit Burn(burner, amount);
    }
}

contract TokenSwap {
    using SafeMath for uint256;

    //Declare variables
    IERC20 public token1;
    IERC20 public token2;
    address public owner1;
    address public owner2;
    uint256 public amount1;
    uint256 public amount2;

    constructor(
        address _owner1,
        uint256 _amount1,
        IERC20 _token1,
        address _owner2,
        uint256 _amount2,
        IERC20 _token2
    ) {
        //first customer
        owner1 = _owner1;
        amount1 = _amount1;
        token1 = IERC20(_token1);
        //second customer
        owner2 = _owner2;
        amount2 = _amount2;
        token2 = IERC20(_token2);
    }

    //create the swap function
    function swap() public {
        //check if the address calling the function is one of the owners in the contract
        require(msg.sender == owner1 || msg.sender == owner2, "Not authorized");
        //check the allowance of the first owner
        require(
            token1.allowance(owner1, address(this)) >= amount1,
            "Token 1 allowance is too low..."
        );
        //check the allowance of the second owner
        require(
            token2.allowance(owner2, address(this)) >= amount2,
            "Token 2 allowance is too low..."
        );
        //Make the transfer
        _safeTransferFrom(token1, owner1, owner2, amount1);
        _safeTransferFrom(token2, owner2, owner1, amount2);
    }

    //create the transferFrom function
    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint256 amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}

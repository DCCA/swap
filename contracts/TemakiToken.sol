// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TemakiToken is ERC20, Ownable {
    using SafeMath for uint256;

    string public _name = "TemakiToken";
    string public _symbol = "TMKT";

    constructor() ERC20(_name, _symbol) {}

    event Mint(address indexed sender, uint256 amount);
    event Burn(address indexed sender, uint256 amount);

    function mint(address buyer, uint256 amount) public onlyOwner {
        _mint(buyer, amount * 10**18);
        emit Mint(buyer, amount * 10**18);
    }

    function burn(address burner, uint256 amount) public {
        _burn(burner, amount);
        emit Burn(burner, amount);
    }
}

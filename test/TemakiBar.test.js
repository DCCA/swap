const assert = require("assert");
const web3 = require('web3');

const TemakiToken = artifacts.require('TemakiToken.sol');
const TemakiBar = artifacts.require('TemakiBar.sol');

//shared variables for test
let temakiBarInstance;
let temakiTokenInstance;


contract ('TemakiBar', (accounts) => {
    beforeEach( async()=>{
        //create a TemakiBar
        temakiBarInstance = await TemakiBar.new();
        //get the TemakiToken instance
        const temakiTokenAddress = await temakiBarInstance.temakiToken();
        temakiTokenInstance = await TemakiToken.at(temakiTokenAddress);
    })
    //Test deploy
    it('has deployed TemakiBar and TemakiToken' , async () => {
        assert.ok(temakiBarInstance.address);
        assert.ok(temakiTokenInstance.address);
    })
    //Tests
    //1.Deposit function
    it('has deposit with success', async () => {
        //make deposit
        await temakiBarInstance.deposit({
            from: accounts[0],
            value: parseInt(web3.utils.toWei('1', 'ether')),
        });
        //get reserve and pool
        const reserve = await temakiBarInstance.reserve()
        const pool = await temakiBarInstance.pool()
        //check reserve and pool
        assert.ok((reserve / pool) == 1)
        //check vars
        const players = await temakiBarInstance.numberPlayers();
        assert.equal(parseInt(players), 1)
    })
    it('has received the Temaki Token', async () => {
        //make deposit
        await temakiBarInstance.deposit({
            from: accounts[0],
            value: parseInt(web3.utils.toWei('1', 'ether')),
        });
        //check balance
        const temakiTokenBalance = await temakiTokenInstance.balanceOf(accounts[0]);
        //check received tokens is correct
        assert.equal(temakiTokenBalance, parseInt(web3.utils.toWei('500', 'ether')));
    })
    it('has send invalid value to deposit', async () => {
        try {
            await temakiBarInstance.deposit({
                from: accounts[0],
                value: parseInt(web3.utils.toWei('0.00000001', 'ether')),
            });
            assert.fail();
        } catch (err) {
            assert.ok(err);
        }
    })
    //2.Withdraw function
    it('has withdraw all Temaki Tokens', async () => {
        //deposit
        await temakiBarInstance.deposit({
            from: accounts[0],
            value: parseInt(web3.utils.toWei('1', 'ether'))
        });
        //get balance in TemakiTokens
        let temakiTokenBalance = await temakiTokenInstance.balanceOf(accounts[0]);
        //withdraw
        try {
            await temakiBarInstance.withdraw(temakiTokenBalance,{
                from: accounts[0]
            });
        } catch(err) {
            console.log(err);
        }
        //get balance again
        temakiTokenBalance = await temakiTokenInstance.balanceOf(accounts[0]);
        //check vars
        assert.equal(parseInt(temakiTokenBalance), 0)
        const temakiTokenSupply = await temakiTokenInstance.totalSupply();
        assert.equal(parseInt(temakiTokenSupply),0);
        const reserveEther = await temakiBarInstance.reserve();
        assert.equal(parseInt(reserveEther),0);
        const balanceEther = await temakiBarInstance.getBalance();
        assert.equal(parseInt(web3.utils.toWei('0.5', 'ether')), balanceEther);
        const players = await temakiBarInstance.numberPlayers();
        assert.equal(parseInt(players), 0)
    })
    it('has tried to withdraw more tokens then balance', async () => {
        //deposit
        await temakiBarInstance.deposit({
            from: accounts[0],
            value: parseInt(web3.utils.toWei('1', 'ether'))
        });
        //get balance in TemakiTokens
        let temakiTokenBalance = web3.utils.toWei('1000', 'ether');
        try {
            await temakiBarInstance.withdraw(temakiTokenBalance,{
                from: accounts[0]
            });
            assert.fail();
        } catch(err) {
            assert.ok(err);
        }
    })
    //3.Bet function
    it('did a failed bet', async () => {
        //deposit
        await temakiBarInstance.deposit({
            from: accounts[0],
            value: parseInt(web3.utils.toWei('1', 'ether'))
        });
        const balanceBefore = await temakiTokenInstance.balanceOf(accounts[0]);
        const betPrice = await temakiBarInstance.betPrice();
        //try to bet
        const {logs} = await temakiBarInstance.betTemaki(1, {
            from: accounts[0]
        })
        //check temakiBalance
        const balanceAfter = await temakiTokenInstance.balanceOf(accounts[0]);
        assert.equal(balanceAfter, balanceBefore - betPrice);
        assert.equal(logs[0].event, 'LostBet');
    })
})
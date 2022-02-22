# TemakiBar - A simple web3 app

**Important - This is a project just for fun and the tokens don't have any value**

This is a simple lottery app that only accepts Temaki Tokens. <br/>
The Temaki Tokens can be bought in our Cashier, exchanged by Ethers, and them <br/>
can be used to make a bet in our Bar.

Every time you buy a Temaki Token, 50% of your Ethereum will go to the Prize Pool <br/>
and 50% will go the a Reserve. 

##### Explaining the Reserve
The Reserve is used if you want to sell your Temaki Tokens <br/>
but the price will not be fixed. They will vary depending on the total value on the Reserve <br/>
divided by the quantity of Temaki Tokens total supply.

##### Explaining the Prize Pool and the Lottery Prize
The Prize Pool is going to be 50% of all Ether exchanged for Temaki Tokens, but the Lottery Prize <br/>
will always be 50% of the total Prize Pool. This logic is used so that there is never a empty Lottery Prize.

##### App Stack
The app was built using Truffle for the Smart Contracts and React with NextJS for the client. <br/>

##### Test-net
To try this app you will need to install MetaMask and set your network to the Rinkeby test-net. <br/> If you need some tokens, you can get at the following link [ChainLink Faucet - Rinkeby](https://faucets.chain.link/rinkeby)

##### To Do's
1. Improve the RandomNumGen using a ChainLink contract
2. Improve the Pool / Prize ratio for a better return on the lottery
3. Implement a staking reward for Temaki Tokens based on Fees per transaction
4. Implement a Governance contract in the TemakiBar
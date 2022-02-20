import '@fontsource/roboto';
import {Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiTokenInstance from '../interfaces/temakiToken';
import BuyForm from '../components/BuyForm';
import SellForm from '../components/SellForm';
import web3 from '../interfaces/web3';

function Cashier() {
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    getAccounts();
    getBalance();
  },[account, balance])

  const getAccounts = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const usingAccount = accounts[0];
    console.log(usingAccount);
    setAccount(usingAccount);
  }

  const getBalance = async () => {
    if(account){
      let freshBalance = await TemakiTokenInstance.methods.balanceOf(account).call();
      freshBalance = web3.utils.fromWei(freshBalance, 'ether');
      setBalance(freshBalance);
    }
  }

  return (
    <Layout>
      <h3>Cashier</h3>
      <Typography>
        Your balance: {balance} Temaki's
      </Typography>
      <BuyForm account={account} balance={balance} updateBalance={getBalance}/>
      <SellForm account={account} balance={balance} updateBalance={getBalance}/>
    </Layout>
  ) 
}

export default Cashier;

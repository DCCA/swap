import '@fontsource/roboto';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiBarInstance from '../interfaces/temakiBar';
import TemakiTokenInstance from '../interfaces/temakiToken';
import BetForm from '../components/BetForm';
import web3 from '../interfaces/web3';

function BetPage() {
  const [betDifficulty, setBetDifficulty] = useState(0);
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState();
  const [prize, setPrize] = useState()

  useEffect(() => {
    getBetDifficulty();
    getPrize();
    getAccounts();
    getBalance();
  },[account, balance, prize])


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

  const getPrize = async () => {
    const result = await TemakiBarInstance.methods.prize().call();
    if(result){
      setPrize(web3.utils.fromWei(result, 'ether'));
    }
  }

  const getBetDifficulty = async () => {
    const result = await TemakiBarInstance.methods.betDifficulty().call();
    setBetDifficulty(result);
  }


  return (
    <Layout>
      <Typography variant='h4'>
        Bar
      </Typography>
      <Typography>
        Changes to win are 1 in {betDifficulty}!
      </Typography>
      <Typography>
        Your balance: {balance} Temaki's
      </Typography>
      <BetForm account={account} balance={balance} updateBalance={getBalance} prize={prize} updatePrize={getPrize}/>
    </Layout>

  ) 
}

export default BetPage;

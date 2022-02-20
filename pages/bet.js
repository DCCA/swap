import '@fontsource/roboto';
import { Typography, Box, SvgIcon, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiBarInstance from '../interfaces/temakiBar';
import TemakiTokenInstance from '../interfaces/temakiToken';
import BetForm from '../components/BetForm';
import web3 from '../interfaces/web3';
import VendingTickets from '../assets/vending-tickets.svg';

function BetPage() {
  const [betDifficulty, setBetDifficulty] = useState(0);
  const [betPrice, setBetPrice] = useState();
  const [balance, setBalance] = useState();
  const [account, setAccount] = useState();
  const [prize, setPrize] = useState()

  useEffect(() => {
    getBetDifficulty();
    getBetPrice();
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

  const getBetPrice = async () => {
    let result = await TemakiBarInstance.methods.betPrice().call();
    result = web3.utils.fromWei(result.toString(), 'ether');
    setBetPrice(result);
  }

  const boxStylesFlex = {
    display: 'flex', 
    flexDirection:'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '1.5rem 0 0'
  }

  return (
    <Layout>
      <Box sx={boxStylesFlex}>
        <SvgIcon component={VendingTickets} color='primary' inheritViewBox='true' sx={{fontSize: '6rem', textAlign: 'center'}}/>
        <Typography variant='h4' color='primary' margin='normal'>
          Bar
        </Typography>
      </Box>
      <Box sx={boxStylesFlex}>
        <Typography>
        You have: <Typography component='span' color='primary' sx={{fontWeight: '600'}}>{balance} Temaki's</Typography>    
        </Typography>
      </Box>
      <Box sx={boxStylesFlex}>
        <Typography>
          Chances to win are 1 in {betDifficulty}!
        </Typography>
        <Typography>
          Each bet cost: {betPrice} Temaki's
        </Typography>
      </Box>
      <Divider sx={{margin: '1rem 0'}}/>
      <BetForm account={account} balance={balance} updateBalance={getBalance} prize={prize} updatePrize={getPrize}/>
    </Layout>

  ) 
}

export default BetPage;

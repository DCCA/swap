import '@fontsource/roboto';
import { Typography, Box, SvgIcon, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiTokenInstance from '../interfaces/temakiToken';
import BuyForm from '../components/BuyForm';
import SellForm from '../components/SellForm';
import web3 from '../interfaces/web3';
import VendingMachine from '../assets/vending-machine.svg';

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
        <SvgIcon component={VendingMachine} color='primary' inheritViewBox='true' sx={{fontSize: '6rem', textAlign: 'center'}}/>
        <Typography variant='h4' color='primary' margin='normal'>
          Cashier
        </Typography>
      </Box>
      <Box sx={boxStylesFlex}>
        <Typography>
        You have: <Typography component='span' color='primary' sx={{fontWeight: '600'}}>{balance} Temaki's</Typography>    
        </Typography>
      </Box>
      <Divider sx={{margin: '1rem 0'}}/>
      <BuyForm account={account} balance={balance} updateBalance={getBalance}/>
      <Divider sx={{margin: '1rem 0'}}/>
      <SellForm account={account} balance={balance} updateBalance={getBalance}/>
    </Layout>
  ) 
}

export default Cashier;

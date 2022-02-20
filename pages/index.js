import { Typography, SvgIcon, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiBarInstance from '../interfaces/temakiBar';
import web3 from '../interfaces/web3';
import CardData from '../components/CardData';
import TemakiIcon from '../assets/temaki-icon.svg';
import DialogNoWallet from '../components/DialogNoWallet';

function HomePage() {
  const [prizePool, setPrizePool] = useState('');
  const [reserveTotal, setReserve] = useState('');
  const [temakiTokenPrize, setTemakiTokenPrice] = useState('');
  const [walletNotConnected, setWalletNotConnected] = useState(false);

  useEffect(()=>{
    getPrizePool();
    getReserve();
    getTemakiTokenPrice();
  },[walletNotConnected])

  const getPrizePool = async () => {
    try {
      const prize = await TemakiBarInstance.methods.prize().call();
      setPrizePool(prize);
    } catch (err) {
      setWalletNotConnected(true);
    }
  }

  const getReserve = async () => {
    try {
    const reserve = await TemakiBarInstance.methods.reserve().call();
    setReserve(reserve);
    } catch (err) {
      setWalletNotConnected(true);
    }
  }

  const getTemakiTokenPrice = async () => {
    try {
    const price = await TemakiBarInstance.methods.temakiEntryPrice().call();
    setTemakiTokenPrice(price);
    } catch (err) {
      setWalletNotConnected(true);
    }
  }

  // TODO - REMOVE DUPLICATED CODES!!
  const boxStylesFlex = {
    display: 'flex', 
    flexDirection:'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '1rem 0 1rem'
  }

  const boxStylesFlexQuestion = {
    display: 'flex', 
    flexDirection:'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '0 0 1rem'
  }

  return (
    <Layout>
      <DialogNoWallet walletNotConnected={walletNotConnected} setWalletNotConnected={setWalletNotConnected}/>
      <Box sx={boxStylesFlex}>
        <SvgIcon component={TemakiIcon} color='primary' inheritViewBox='true' sx={{fontSize: '8rem', textAlign: 'center'}}/>
        <Typography variant='h4' color='primary' sx={{textAlign: 'center'}}>
          Welcome to the Temaki bar!
        </Typography>
      </Box>
      <Box sx={boxStylesFlexQuestion}>
        <Typography>
        What would like to order today?
        </Typography>
      </Box>
      <CardData 
        data={web3.utils.fromWei(temakiTokenPrize, 'ether')} 
        description='$temaki.token.price'
        action='/buy.temaki.tokens'
        href='/cashier'
      />
      <CardData 
        data={web3.utils.fromWei(prizePool, 'ether')} 
        description='$lottery.prize'
        action='/bet.now'
        href='/bet'
      />
      <CardData 
        data={web3.utils.fromWei(reserveTotal, 'ether')} 
        description='$ether.locked'
        action='/sell.temaki.tokens'
        href='/cashier'
      />
    </Layout>

  ) 
}

export default HomePage

import { Typography, SvgIcon, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiBarInstance from '../interfaces/temakiBar';
import web3 from '../interfaces/web3';
import CardData from '../components/CardData';
import TemakiIcon from '../assets/temaki-icon.svg';

function HomePage() {
  const [prizePool, setPrizePool] = useState('');
  const [reserveTotal, setReserve] = useState('');
  const [temakiTokenPrize, setTemakiTokenPrice] = useState('');

  useEffect(()=>{
    getPrizePool();
    getReserve();
    getTemakiTokenPrice();
  },[])

  const getPrizePool = async () => {
    const prize = await TemakiBarInstance.methods.prize().call();
    setPrizePool(prize);
  }

  const getReserve = async () => {
    const reserve = await TemakiBarInstance.methods.reserve().call();
    setReserve(reserve);
  }

  const getTemakiTokenPrice = async () => {
    const price = await TemakiBarInstance.methods.temakiEntryPrice().call();
    setTemakiTokenPrice(price);
  }

  // TODO - REMOVE DUPLICATED CODES!!
  const boxStylesFlex = {
    display: 'flex', 
    flexDirection:'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '3rem 0'
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
      <Box sx={boxStylesFlex}>
        <SvgIcon component={TemakiIcon} color='primary' inheritViewBox='true' sx={{fontSize: '10rem', textAlign: 'center'}}/>
        <Typography variant='h4' color='primary'>
          Welcome to the Temaki bar!
        </Typography>
      </Box>
      <Box sx={boxStylesFlexQuestion}>
        <Typography>
        What would like to order today?
        </Typography>
      </Box>
      <CardData 
        data={web3.utils.fromWei(temakiTokenPrize, 'ether') + ' ETH'} 
        description='$temaki.token.price'
        action='/buy.temaki.tokens'
        href='/cashier'
      />
      <CardData 
        data={web3.utils.fromWei(prizePool, 'ether') + ' ETH'} 
        description='$lottery.prize'
        action='/bet.now'
        href='/bet'
      />
      <CardData 
        data={web3.utils.fromWei(reserveTotal, 'ether') + ' ETH'} 
        description='$ether.locked'
        action='/sell.temaki.tokens'
        href='/cashier'
      />
    </Layout>

  ) 
}

export default HomePage

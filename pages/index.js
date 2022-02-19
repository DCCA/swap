import '@fontsource/roboto';
import { Button, ButtonGroup, Card, CardContent, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import TemakiBarInstance from '../interfaces/temakiBar';
import web3 from '../interfaces/web3';
import CardData from '../components/CardData';

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

  return (
    <Layout>
      <h3>Welcome to Temaki bar!</h3>
      <p>What would like to order today?</p>
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

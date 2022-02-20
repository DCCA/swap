import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from '@mui/material';

const DialogNoWallet = (props) => {
    const {walletNotConnected, setWalletNotConnected} = props

    const tryAgainHanddler = () => {
        setWalletNotConnected(false);
    }

    return (
        <Dialog open={walletNotConnected}>
        <DialogTitle id="alert-dialog-title">
          <Typography>Please install MetaMask to use this app</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This app needs the MetaMask extension connected to the Rinkeby Testnet to work.
            Please go to their web site and intall MetaMask, then change to the Rinkeby Testnet.
            Use the buttons to guide you. If you already intalled, click in the "Try Again" button.
            [THIS IS A TEST APP - THE COINS DON'T HAVE VALUE]
          </DialogContentText>
          <DialogActions>
            <a target='_blank' href='https://metamask.io/'>
              <Button variant='contained' sx={{margin: '0 1rem'}}>Go to MetaMask</Button>
            </a>
            <Button onClick={tryAgainHanddler} variant='contained'>Try Again</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )

}

export default DialogNoWallet;
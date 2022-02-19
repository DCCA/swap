import React, { useEffect, useState } from "react";
import {FormControl, Typography, TextField, Button} from '@mui/material';
import TemakiBarInstance from "../interfaces/temakiBar";
import web3 from "../interfaces/web3";

const BuyForm = (props) => {
    const [value, setValue] = useState();
    const [temakiTokenPrice, setTemakiTokenPrice] = useState();
    const [ethersNeeded, setEthersNeeded] = useState();
    const {account} = props;

    useEffect(() => {
        getTemakiTokenPrice();
    },[ethersNeeded])

    const getTemakiTokenPrice = async () => {
        const result = await TemakiBarInstance.methods.temakiEntryPrice().call();
        setTemakiTokenPrice(result);
    }

    const onSubmitHanddler = async (e) => {
        e.preventDefault();

      }

    const onChangeHanddler = (e) => {
        setValue(e.target.value);
        let estimated = (e.target.value * temakiTokenPrice);
        // TODO - HANDLER ERROR!
        estimated = web3.utils.fromWei(estimated.toString(), 'ether');
        setEthersNeeded(estimated);
    }

    return (
        <form onSubmit={onSubmitHanddler}>
            <FormControl fullWidth margin='normal' >
                <Typography>
                    Buy some Temakis!
                </Typography>
                <TextField 
                    id="temakiAmount" 
                    label="How many $temakis.token you want?" 
                    variant="outlined" 
                    margin='normal'
                    value={value}
                    onChange={onChangeHanddler}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    helperText={`Estimated spend in Ethers is ` + ethersNeeded}
                    />
                <Button variant='contained' sx={{textTransform: 'lowercase'}} type='submit'>
                    /$buy.temakis
                </Button>
            </FormControl>
        </form>
    )
}

export default BuyForm;
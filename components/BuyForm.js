import React, { useEffect, useState } from "react";
import {FormControl, Typography, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import TemakiBarInstance from "../interfaces/temakiBar";
import web3 from "../interfaces/web3";

const BuyForm = (props) => {
    const [value, setValue] = useState();
    const [temakiTokenPrice, setTemakiTokenPrice] = useState();
    const [ethersNeeded, setEthersNeeded] = useState();
    const {account, balance} = props;
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getTemakiTokenPrice();
    },[ethersNeeded, balance])

    const getTemakiTokenPrice = async () => {
        const result = await TemakiBarInstance.methods.temakiEntryPrice().call();
        setTemakiTokenPrice(result);
    }

    const onSubmitHanddler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await TemakiBarInstance.methods.deposit().send({
                from: account,
                value: web3.utils.toWei(ethersNeeded,'ether')
            })
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
      }

    const onChangeHanddler = (e) => {
        setValue(e.target.value);
        let estimated = (e.target.value * temakiTokenPrice) * 2;
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
                    label="How many $temakis.token you want buy?" 
                    variant="outlined" 
                    margin='normal'
                    value={value}
                    onChange={onChangeHanddler}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    helperText={`Estimated spend in Ethers is ` + ethersNeeded}
                    />
                <LoadingButton 
                    variant='contained' 
                    sx={{textTransform: 'lowercase'}} 
                    type='submit'
                    loading={isLoading}
                    >
                    /$buy.temakis
                </LoadingButton>
            </FormControl>
        </form>
    )
}

export default BuyForm;
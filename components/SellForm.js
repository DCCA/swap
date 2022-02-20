import React, { useEffect, useState } from "react";
import {FormControl, Typography, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import TemakiBarInstance from "../interfaces/temakiBar";
import web3 from "../interfaces/web3";

const BuyForm = (props) => {
    const [value, setValue] = useState();
    const [temakiTokenPrice, setTemakiTokenPrice] = useState();
    const [etherEstimated, setEthersEstimated] = useState();
    const {account, balance} = props;
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        getTemakiTokenPrice();
    },[etherEstimated, balance])

    const getTemakiTokenPrice = async () => {
        const result = await TemakiBarInstance.methods.temakiExitPrice().call();
        setTemakiTokenPrice(result);
    }

    const onSubmitHanddler = async (e) => {
        e.preventDefault();
        let correctValue = web3.utils.toWei(value, 'ether')    
        setLoading(true);
        try {
            await TemakiBarInstance.methods
                .withdraw(correctValue
                )
                .send({
                    from: account,
                })
        } catch (err) {
            console.log(err)
        }
        setLoading(false);
      }

    const onChangeHanddler = (e) => {
        setValue(e.target.value);
        let estimated = (e.target.value / temakiTokenPrice);
        setEthersEstimated(estimated);
    }

    return (
        <form onSubmit={onSubmitHanddler}>
            <FormControl fullWidth margin='normal' >
                <Typography>
                    Sell some Temakis!
                </Typography>
                <TextField 
                    id="temakiAmount" 
                    label="How many $temakis.token you want sell?" 
                    variant="outlined" 
                    margin='normal'
                    value={value}
                    onChange={onChangeHanddler}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    helperText={`Estimated received in Ethers is ` + etherEstimated}
                    />
                <LoadingButton 
                    variant='contained' 
                    sx={{textTransform: 'lowercase'}} 
                    type='submit'
                    loading={isLoading}
                    >
                    /$sell.temakis
                </LoadingButton>
            </FormControl>
        </form>
    )
}

export default BuyForm;
import React, { useEffect, useState } from "react";
import {FormGroup, Typography, TextField, Alert, AlertTitle} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import TemakiBarInstance from "../interfaces/temakiBar";
import web3 from "../interfaces/web3";

const BuyForm = (props) => {
    const {account, balance, updateBalance} = props;

    const [value, setValue] = useState();
    const [temakiTokenPrice, setTemakiTokenPrice] = useState();
    const [etherEstimated, setEthersEstimated] = useState(0);
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')


    useEffect(() => {
        getTemakiTokenPrice();
    },[etherEstimated, balance, value])

    const getTemakiTokenPrice = async () => {
        const result = await TemakiBarInstance.methods.temakiExitPrice().call();
        setTemakiTokenPrice(result);
    }

    const onSubmitHanddler = async (e) => {
        e.preventDefault();
        setErrorMessage('')
        let correctValue = web3.utils.toWei(value, 'ether')    
        setLoading(true);
        try {
            await TemakiBarInstance.methods
                .withdraw(correctValue
                )
                .send({
                    from: account,
                })
            await updateBalance();
            setValue(0);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
      }

    const onChangeHanddler = (e) => {
        setErrorMessage('')
        setValue(e.target.value);
        // TODO - REMOVE THE MULT BY 10
        let estimated = (e.target.value / (temakiTokenPrice));
        setEthersEstimated(estimated);
    }

    const errorMessageHanddler = () => {
        if(!!errorMessage){
            return (
                <Alert severity="error" sx={{marginBottom: '.5rem'}}>
                    <AlertTitle>
                        Oppss...
                    </AlertTitle>
                    {errorMessage}
                </Alert>
            )
        }
    }


    return (
        <form onSubmit={onSubmitHanddler}>
            <FormGroup margin='normal' >
                <Typography variant="h6">
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
                {errorMessageHanddler()}
                <LoadingButton 
                    variant='contained' 
                    sx={{textTransform: 'lowercase'}} 
                    type='submit'
                    loading={isLoading}
                    >
                    /$sell.temakis
                </LoadingButton>
            </FormGroup>
        </form>
    )
}

export default BuyForm;
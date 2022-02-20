import React, { useEffect, useState } from "react";
import {Typography, TextField, Alert, AlertTitle, FormGroup} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import TemakiBarInstance from "../interfaces/temakiBar";
import web3 from "../interfaces/web3";

const BuyForm = (props) => {
    const [value, setValue] = useState();
    const [temakiTokenPrice, setTemakiTokenPrice] = useState();
    const [ethersNeeded, setEthersNeeded] = useState();
    const {account, balance, updateBalance} = props;
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        getTemakiTokenPrice();
    },[ethersNeeded, balance])

    const getTemakiTokenPrice = async () => {
        const result = await TemakiBarInstance.methods.temakiEntryPrice().call();
        setTemakiTokenPrice(result);
    }

    const onSubmitHanddler = async (e) => {
        e.preventDefault();
        setErrorMessage('')
        setLoading(true);
        try {
            await TemakiBarInstance.methods.deposit().send({
                from: account,
                value: web3.utils.toWei(ethersNeeded,'ether')
            })
            await updateBalance();
            setValue(0);
        } catch (err) {
            setErrorMessage(err.message);
            console.log(errorMessage);
        }
        setLoading(false);
      }

    const onChangeHanddler = (e) => {
        setErrorMessage('')
        setValue(e.target.value);
        let estimated = (e.target.value * temakiTokenPrice) * 2;
        // TODO - HANDLER ERROR!
        try {
            estimated = web3.utils.fromWei(estimated.toString(), 'ether');
        } catch (err){
            setErrorMessage(err.message);
        }
        setEthersNeeded(estimated);
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
                {errorMessageHanddler()}
                <LoadingButton 
                    variant='contained' 
                    sx={{textTransform: 'lowercase'}} 
                    type='submit'
                    loading={isLoading}
                    >
                    /$buy.temakis
                </LoadingButton>
            </FormGroup>
        </form>
    )
}

export default BuyForm;
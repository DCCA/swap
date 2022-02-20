import React, { useEffect, useState } from "react";
import {Typography, TextField, Alert, AlertTitle, FormGroup} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import TemakiBarInstance from "../interfaces/temakiBar";

const BetForm = (props) => {
    //get props from parent
    const {account, balance, updateBalance, prize , updatePrize} = props;
    //start states
    const [value, setValue] = useState();
    const [isLoading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [lostBetResult, setLostBetResult] = useState();
    const [wonBetResult, setWonBetResult] = useState();

    useEffect(() => {
    },[balance])

    const messages = {
        won: 'Wow! You just on our Lottery! Make good use of the Ethers!',
        lost: 'Not this time, but keep trying!'
    }

    const onSubmitHanddler = async (e) => {
        e.preventDefault();
        //reset states
        setErrorMessage('')
        setLoading(true);
        setLostBetResult('');
        //check if number between 0 - 999
        //try to interact with contracts
        try {
            if(value < 0 || value > 999){
                throw new Error('The number is not valid')
            }
            const betResult = await TemakiBarInstance.methods
                .betTemaki(value)
                .send({
                    from: account,
                    })
            if(betResult.events.WonBet){
                setWonBetResult(messages.won);
                updatePrize();
                console.log('won')
            } else {
                setLostBetResult(messages.lost);
                console.log('lost')
            }
            await updateBalance();
            setValue('')
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
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

    const betMessageHanddler = () => {
        if(!!lostBetResult){
            return (
                <Alert severity="info" sx={{marginTop: '.5rem'}}>
                    <AlertTitle>
                        Not this...
                    </AlertTitle>
                    {lostBetResult}
                </Alert>
            )
        } else if (!!wonBetResult) {
            return (
                <Alert severity="success" sx={{marginTop: '.5rem'}}>
                    <AlertTitle>
                        You won!!
                    </AlertTitle>
                    {wonBetResult}
                </Alert>
            )
        }
    }

    return (
        <form onSubmit={onSubmitHanddler}>
            <FormGroup margin='normal' margin='normal'>
                <Typography>
                    Bet some Temakis for a chance to win the prize of {prize} ETH!
                </Typography>
                <TextField 
                    id="temakiAmount" 
                    label="What is your lucky number?" 
                    variant="outlined" 
                    margin='normal'
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    helperText='The number has to be between 0 to 999'
                    />
                {errorMessageHanddler()}
                <LoadingButton 
                    variant='contained' 
                    sx={{textTransform: 'lowercase'}} 
                    type='submit'
                    loading={isLoading}
                    >
                    /$make.your.bet
                </LoadingButton>
                {betMessageHanddler()}
            </FormGroup>
        </form>
    )
}

export default BetForm;
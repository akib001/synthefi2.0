import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {ethers} from '../../../ether/ethers-5.6.esm.min';
import {abi, contractAddress} from '../../../ether/constants';

const Index = () => {
    const router = useRouter();
    const [amount, setAmount] = useState(0);
    const [ethPrice, setEthPrice] = useState(0);

    const {poolPrice} = router.query;

    console.log(router)

    useEffect(() => {
        async function getEthPrice() {
            // Make a GET request to the CoinMarketCap API to get the latest Ethereum price
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
            const data = await response.json();
            console.log('eth Price', data[0]?.current_price);
            setEthPrice(data[0]?.current_price);

        }

        getEthPrice();
    }, [])

    async function fund(amount) {
        const amountInETH = (amount/ethPrice).toString();
        console.log(`Funding with ${amountInETH}...in ${ethPrice} usd price rate`)
        console.log('ethers.utils.parseEther(amount)', ethers.utils.parseEther(amountInETH))
        if (typeof window.ethereum !== 'undefined' && typeof window !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            try {
                const transactionResponse = await contract.fund({ value: ethers.utils.parseEther(amountInETH)});
                await listenForTransactionMine(transactionResponse, provider);
                console.log(`Done`);
            } catch (err) {
                console.log(err)
            }

        }
    }

    const submitHandler = (e) => {
        event.preventDefault();
        console.log(amount)
        fund(amount);
    }

    return (
        <Container maxWidth="md">
            <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Trade</Typography>
            <Paper elevation={3} sx={{padding: 3}}>
                    <form onSubmit={submitHandler}>
                <Grid container rowGap={2}>
                    <Grid container xs={12}>
                        <Typography variant={"h5"}>Tesla Stock</Typography>
                    </Grid>
                    <Grid container xs={12}>
                        <Typography variant={"h5"}>Tesla Stock Price: 331 USD</Typography>
                    </Grid>
                    <Grid container xs={12}>
                        <Typography variant={"h5"}>Premier: 180%</Typography>
                    </Grid>
                    <Grid container xs={12}>
                        <Typography variant={"h5"}>Buying Price: 180 USD</Typography>
                    </Grid>
                        <Grid container xs={8}>
                            <TextField id="amount" fullWidth={true} onChange={(e) => setAmount(e.target.value)} type="number" label="Enter Amount"
                                       variant="outlined"/>
                        </Grid>
                        <Grid container xs={3} ml={2}>
                            <Button variant="contained" type={"submit"} fullWidth={true} startIcon={<MonetizationOnIcon/>}>Buy
                                Stock</Button>
                        </Grid>

                </Grid>
                    </form>
            </Paper>
        </Container>
    );
};

export default Index;
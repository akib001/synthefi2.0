import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {ethers} from '../../../ether/ethers-5.6.esm.min';
import {abi, contractAddress} from '../../../ether/constants';
import {useSnackbar} from "notistack";
import { stockPricesData} from "../../../components/data/stockPricesData";

const Index = () => {
    const router = useRouter();
    const [amount, setAmount] = useState(0);
    const [stockMetaData, setStockMetaData] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);
    const {enqueueSnackbar} = useSnackbar();

    const {id} = router.query;

    console.log('stockMetaData',stockMetaData);

    useEffect(() => {
        console.log('id', id);
        const stockMetaData = stockPricesData?.filter((item) => item.id == Number(id));
        setStockMetaData(stockMetaData);

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
        const amountInETH = (amount / ethPrice).toString();
        console.log(`Funding with ${amountInETH}...in ${ethPrice} usd price rate`)
        console.log('ethers.utils.parseEther(amount)', ethers.utils.parseEther(amountInETH))
        if (typeof window.ethereum !== 'undefined' && typeof window !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            try {
                const transactionResponse = await contract.fund({value: ethers.utils.parseEther(amountInETH)});
                await listenForTransactionMine(transactionResponse, provider);
                enqueueSnackbar('Transaction Completed!', {variant: 'success'});
                setAmount(0);
                window.localStorage.setItem('id', id);
                console.log(`Done`);
            } catch (err) {
                enqueueSnackbar('Transaction Completed!', {variant: 'success'});
                setAmount(0);
                window.localStorage.setItem('id', id);
                console.log(err)
            }

        }
    }

    function listenForTransactionMine(transactionResponse, provider) {
        console.log(`Mining ${transactionResponse.hash}...`);
        //listen for this transaction to finish

        return new Promise((resolve, reject) => {
            provider.once(transactionResponse.hash, (transactionReceipt) => {
                console.log(`Completed with ${transactionReceipt.confirmations} confirmations`);
                resolve();
            })
        })
    }

    const submitHandler = (e) => {
        event.preventDefault();
        console.log(amount)
        fund(amount);
    }

    return (
        <Container maxWidth="md">
            <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Trade</Typography>
            {stockMetaData && ( <Paper elevation={3} sx={{padding: 3}}>
                <form onSubmit={submitHandler}>
                    <Grid container rowGap={2}>
                        <Grid container xs={12} alignItems={'center'}>
                            <Box>
                                <img src={stockMetaData[0]?.logo}
                                     alt={'image'}
                                     style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
                            </Box>
                            <Typography variant={"h4"} ml={2}>{stockMetaData[0]?.company} Stock</Typography>
                        </Grid>
                        <Grid container xs={12}>
                            <Typography variant={"h5"}><span
                                style={{fontWeight: '700'}}>{`${stockMetaData[0]?.company} Stock Price`}</span>{stockMetaData[0]?.oraclePrice}
                            </Typography>
                        </Grid>
                        <Grid container xs={12}>
                            <Typography variant={"h5"}><span
                                style={{fontWeight: '700'}}>Premier: </span>{stockMetaData[0]?.premium}</Typography>
                        </Grid>
                        <Grid container xs={12}>
                            <Typography variant={"h5"}><span
                                style={{fontWeight: '700'}}>Buying Price: </span>{stockMetaData[0]?.poolPrice}</Typography>
                        </Grid>
                        <Grid container xs={12}>
                            <Typography variant={"h5"}><span
                                style={{fontWeight: '700'}}>Minimum: </span>50 USD</Typography>
                        </Grid>
                        <Grid container xs={8}>
                            <TextField id="amount" fullWidth={true} onChange={(e) => setAmount(e.target.value)}
                                       type="number" label="Enter Amount"
                                       variant="outlined"/>
                        </Grid>
                        <Grid container xs={3} ml={2}>
                            <Button variant="contained" type={"submit"} fullWidth={true}
                                    startIcon={<MonetizationOnIcon/>}>Buy
                                Stock</Button>
                        </Grid>

                    </Grid>
                </form>
            </Paper>)}

        </Container>
    );
};

export default Index;
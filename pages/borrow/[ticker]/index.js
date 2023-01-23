import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Slider,
    TextField,
    Typography
} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {ethers} from '../../../ether/ethers-5.6.esm.min';
import {abi, contractAddress} from '../../../ether/constants';
import {useSnackbar} from "notistack";
import {stockBorrowPricesData} from "../../../components/data/stockBorrowPricesData";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Divider from "@mui/material/Divider";

const Index = () => {
    const router = useRouter();
    const [amount, setAmount] = useState(0);
    const [stockMetaData, setStockMetaData] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);
    const [value, setValue] = useState(140);
    const [redSliderTrack, setRedSliderTrack] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const {id} = router.query;

    useEffect(() => {
        const stockMetaData = stockBorrowPricesData?.find((item) => item.id == Number(id));
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

    const marks = [{
        value: 130, label: 'Min. 130%',
    }, {
        value: 200, label: 'Safe 200%',
    },];

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        setRedSliderTrack(newValue <= 130 ? true : false);
    };

    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
        setRedSliderTrack(Number(event.target.value) <= 130 ? true : false);
    };


    return (<Container maxWidth="lg">
            <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Borrow | Mint</Typography>
            {stockMetaData && (

                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <Paper elevation={3} sx={{py: 4, px: 3, borderRadius: '10px'}}>
                            <form onSubmit={submitHandler}>
                                <Grid container rowGap={2}>

                                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                        <LooksOneIcon/>
                                        <Typography variant={"h5"} ml={1}>
                                            Choose a Collateral Asset:
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField id="amount" fullWidth={true}
                                                   onChange={(e) => setAmount(e.target.value)}
                                                   type="number" label="Enter Amount"
                                                   sx={{ m: 1}}
                                                   variant="outlined"
                                                   InputProps={{
                                                       startAdornment: <InputAdornment position="start">
                                                           $ </InputAdornment>,
                                                   }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} my={2}>
                                        <Divider/>
                                    </Grid>

                                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                        <LooksTwoIcon/>
                                        <Typography variant={"h5"} ml={1}>
                                            Set a Collateral Ratio
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12} mt={2}>
                                        <Grid container spacing={2} p={1}>
                                            <Grid item xs={10} sx={{display: 'flex', alignItems: 'center'}}>
                                                <Slider
                                                    aria-label="input-slider"
                                                    value={typeof value === 'number' ? value : 0}
                                                    step={5}
                                                    onChange={handleSliderChange}
                                                    valueLabelFormat={(value) => `${value}%`}
                                                    marks={marks}
                                                    valueLabelDisplay="on"
                                                    max={250}
                                                    min={90}
                                                    sx={{
                                                        '& .MuiSlider-track': {
                                                            color: redSliderTrack && 'red'
                                                        }, '& .MuiSlider-thumb': {
                                                            color: redSliderTrack && 'red'
                                                        }, '& .MuiSlider-valueLabel': {
                                                            backgroundColor: redSliderTrack && 'red',
                                                        }, height: 10
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={2} sx={{display: 'flex', alignItems: 'center'}}>
                                                <TextField
                                                    fullWidth={true}
                                                    value={value}
                                                    size="medium"
                                                    onChange={handleInputChange}
                                                    inputProps={{
                                                        step: 5,
                                                        min: 90,
                                                        max: 250,
                                                        type: 'number',
                                                        'aria-labelledby': 'input-slider',
                                                    }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} my={2}>
                                        <Divider/>
                                    </Grid>

                                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                        <Looks3Icon/>
                                        <Typography variant={"h5"} ml={1}>
                                            Confirm Borrow Amount
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            label=""
                                            fullWidth={true}
                                            id="outlined-start-adornment"
                                            sx={{m: 1}}
                                            type={'number'}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">
                                                    <img src={stockMetaData?.logo}
                                                         alt={'image'}
                                                         style={{
                                                             height: '30px',
                                                             width: '100%',
                                                             objectFit: 'contain',
                                                             marginRight: '4px'
                                                         }}/>
                                                    {stockMetaData?.symbol}{' '}</InputAdornment>,
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} mt={1}>
                                        <Button variant={'contained'} fullWidth={true} sx={{
                                            backgroundColor: '#66adff',
                                            py: 1.4,
                                            fontSize: '1.15rem',
                                            fontWeight: '600',
                                            color: 'white',
                                            borderRadius: '10px'
                                        }}>Borrow Stock</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Grid>
                    <Grid item xs={5}>
                        <Paper elevation={3} sx={{borderRadius: '15px', padding: 3}}>
                            <Grid container xs={12} alignItems={'center'}>
                                <Box>
                                    <img src={stockMetaData?.logo}
                                         alt={'image'}
                                         style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
                                </Box>
                                <Typography variant={"h4"} ml={2}>{stockMetaData?.company} Stock</Typography>
                            </Grid>
                            <Grid item xs={12} px={1} mt={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant={"h6"}>
                                    {`${stockMetaData?.company} Stock Price`}
                                </Typography>
                                <Typography variant={"h6"}>
                                    {stockMetaData?.oraclePrice}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} px={1} mt={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant={"h6"}>
                                    Premier
                                </Typography>
                                <Typography variant={"h6"}>
                                    {stockMetaData?.premium}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} px={1} mt={1} sx={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography variant={"h6"}>
                                    Buying Price
                                </Typography>
                                <Typography variant={"h6"}>
                                    {stockMetaData?.poolPrice}
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>

            )}

        </Container>);
};

export default Index;
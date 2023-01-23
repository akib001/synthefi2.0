import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {
    Box,
    Button,
    Container,
    FormControlLabel, FormGroup,
    Grid, InputAdornment,
    Paper,
    Switch,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {ethers} from '../../../ether/ethers-5.6.esm.min';
import {abi, contractAddress} from '../../../ether/constants';
import {useSnackbar} from "notistack";
import {stockPricesData} from "../../../components/data/stockPricesData";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import SouthIcon from '@mui/icons-material/South';

const Index = () => {
    const router = useRouter();
    const [amount, setAmount] = useState(0);
    const [stockMetaData, setStockMetaData] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);
    const {enqueueSnackbar} = useSnackbar();

    const [value, setValue] = React.useState(0);
    const {id} = router.query;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    console.log('stockMetaData', stockMetaData);

    useEffect(() => {
        console.log('id', id);
        const stockMetaData = stockPricesData?.find((item) => item.id == Number(id));
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
        <Container maxWidth="lg">
            <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Trade</Typography>
            <Paper elevation={3} sx={{mt: 2, mb: 3, borderRadius: '10px'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Buy" sx={{fontSize: '1.15rem', px: 4, py: 2}}/>
                    <Tab label="Sell" sx={{fontSize: '1.15rem', px: 4, py: 2}}/>
                </Tabs>
            </Paper>

            {stockMetaData && (
                <Grid container spacing={3}>
                    <Grid item xs={7}>
                        <Paper elevation={3} sx={{padding: 3, borderRadius: '10px'}}>
                            <form onSubmit={submitHandler}>
                                {/* buy and sell*/}

                                {value === 0 ? (<Grid container rowGap={2}>
                                    <Grid item xs={12}>
                                        <FormGroup>
                                            <FormControlLabel control={<Switch defaultChecked/>} label="Limit Order"/>
                                        </FormGroup>
                                    </Grid>
                                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                        <LooksOneIcon/>
                                        <Typography variant={"h5"} ml={1}>
                                            Pay
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField id="amount" fullWidth={true}
                                                   onChange={(e) => setAmount(e.target.value)}
                                                   type="number" label="Enter Amount"
                                                   variant="outlined"
                                                   InputProps={{
                                                       startAdornment: <InputAdornment position="start">
                                                           USD </InputAdornment>,
                                                   }}
                                        />
                                    </Grid>

                                    <Grid item mt={1} xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                                        <SouthIcon fontSize={'large'}/>
                                    </Grid>

                                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                        <LooksTwoIcon/>
                                        <Typography variant={"h5"} ml={1}>
                                            To Buy
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            label=""
                                            fullWidth={true}
                                            id="outlined-start-adornment"

                                            type={'number'}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end" sx={{px: 2}}>
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
                                        }}>Buy Stock</Button>
                                    </Grid>

                                </Grid>) : (
                                    // Sell
                                    <Grid container rowGap={2}>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel control={<Switch defaultChecked/>}
                                                                  label="Limit Order"/>
                                            </FormGroup>
                                        </Grid>
                                        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                            <LooksOneIcon/>
                                            <Typography variant={"h5"} ml={1}>
                                                Sell
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField
                                                label=""
                                                fullWidth={true}
                                                id="outlined-start-adornment"

                                                type={'number'}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end" sx={{px: 2}}>
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

                                        <Grid item mt={1} xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                                            <SouthIcon fontSize={'large'}/>
                                        </Grid>

                                        <Grid item xs={12} sx={{display: 'flex', alignItems: 'center'}}>
                                            <LooksTwoIcon/>
                                            <Typography variant={"h5"} ml={1}>
                                                To Get
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField id="amount" fullWidth={true}
                                                       onChange={(e) => setAmount(e.target.value)}
                                                       type="number" label="Enter Amount"
                                                       variant="outlined"
                                                       InputProps={{
                                                           startAdornment: <InputAdornment position="start">
                                                               USD </InputAdornment>,
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
                                            }}>Buy Stock</Button>
                                        </Grid>

                                    </Grid>)}

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

        </Container>
    );
};

export default Index;
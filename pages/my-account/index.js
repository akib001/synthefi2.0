import React, {useEffect, useState} from 'react';
import {Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import {stockPricesData} from "../../components/data/stockPricesData";
import {ethers} from "../../ether/ethers-5.6.esm.min";
import {abi, contractAddress} from "../../ether/constants";
import {useSnackbar} from "notistack";


const MyPage = () => {
    const [stockMetaData, setStockMetaData] = useState(null);
    const [ethPrice, setEthPrice] = useState(0);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const id = window.localStorage.getItem('id');
        if (id) {
            const stockData = stockPricesData?.filter((item) => item.id == Number(id));
            setStockMetaData(stockData);
        }
    }, [])

    async function getBalance() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const balance = await provider.getBalance(contractAddress);
            console.log(`Balance ${balance} in Wei`);
            const ethPrice = ethers.utils.formatEther(balance);
            console.log('ethPrice', ethPrice)

            setEthPrice(Number(ethPrice));
        }
    }

    async function fund() {
        const ethAmount = document.getElementById('ethAmount').value;
        console.log(`Funding with ${ethAmount}...`)
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi, signer);
            try {
                const transactionResponse = await contract.fund({value: ethers.utils.parseEther(ethAmount)});
                await listenForTransactionMine(transactionResponse, provider);
                console.log(`Done`);
            } catch (err) {
                console.log(err)
            }

        }
    }


    async function withdrawBalance() {
        console.log(`Withdrawing...`)
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            await provider.send('eth_requestAccounts', [])
            const signer = provider.getSigner()
            const contract = new ethers.Contract(contractAddress, abi, signer)
            try {
                const transactionResponse = await contract.withdraw()
                await listenForTransactionMine(transactionResponse, provider)
                // await transactionResponse.wait(1)
                enqueueSnackbar('Money Withdrawn successfully', {variant: 'success'});
                window.localStorage.removeItem('id');
                setStockMetaData(null);
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('please install metamask')
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

    return (<Container maxWidth={'md'}>
            {stockMetaData ? (<Paper elevation={3} sx={{padding: 3, mt: 3, borderRadius: '10px'}}>
                <Grid container rowGap={2}>
                    <Grid container xs={12} alignItems={'center'}>
                        <Box>
                            <img src={stockMetaData[0]?.logo}
                                 alt={'tesla stocks'} style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
                        </Box>
                        <Typography variant={"h4"} ml={2}>{stockMetaData[0]?.company} Stock</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}><span
                            style={{fontWeight: '700'}}>Stock Brought At: </span>{stockMetaData[0]?.poolPrice}
                        </Typography>
                    </Grid>
                    <Grid container xs={12}>
                        <Box>
                            <Typography variant={"h5"} sx={{fontWeight: '700'}}>Current Stock Price:</Typography>
                        </Box>
                        <Box ml={2}>
                            {ethPrice ? (<Typography variant={"h5"}>{ethPrice} ETH</Typography>) : (
                                <Button variant={'contained'} color={'secondary'} onClick={getBalance}>
                                    Fetch Price
                                </Button>)}

                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"h5"}><span
                            style={{fontWeight: '700'}}>Buying Date: </span>07/01/2023</Typography>
                    </Grid>
                    <Grid item xs={12} mt={1}>
                        <Button variant={'contained'} startIcon={<MonetizationOnIcon/>} onClick={withdrawBalance}
                                fullWidth={true} sx={{
                            backgroundColor: '#66adff',
                            py: 1.4,
                            fontSize: '1.15rem',
                            fontWeight: '600',
                            color: 'white',
                            borderRadius: '10px'
                        }}>Sell This Stock & Withdraw Money</Button>
                    </Grid>
                </Grid>
            </Paper>) :  <Typography variant={'h4'} textAlign={'center'} mt={4}>
                No Purchase History
            </Typography>}

        </Container>
    );
};

export default MyPage;
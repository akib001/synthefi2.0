import React from 'react';
import {Box, Button, Container, Grid, Paper, Slider, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {polls} from "../../components/data/poolsData";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {useRouter} from "next/router";

const Govern = () => {
    const router = useRouter();
    function valuetext(value) {
        return `Quorum ${value * 100}%`;
    }

    return (<Container maxWidth="lg">
        <Grid container alignItems={'center'} justifyContent={'space-between'}>
            <Grid item>
                <Typography variant={'h3'} sx={{my: 2, ml: 1}}>Govern</Typography>
            </Grid>
            <Grid item>
                <Button variant={'outlined'} size={'large'} onClick={() => router.push('govern/create-poll')} startIcon={<AddCircleIcon/>}>Create Poll</Button>
            </Grid>
        </Grid>
        <Typography variant={'body1'} sx={{my: 2, ml: 1}}>Polls ✨</Typography>
        <Grid container spacing={2}>
            {polls?.map((item, index) => (<Grid key={index} item xs={6}>
                <Paper elevation={3} sx={{padding: 3}}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant='body1' color={'gray'}>
                                ID: {item?.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant='body1' color={'gray'} align={'right'}>
                                {item?.type}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} my={1}>
                            <Typography variant='h6' color={item?.status === '❌ REJECTED' ? '#f92f60' : '#00d26a'}>
                                {item?.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} my={1}>
                            <Typography variant='h6'>
                                {item?.subject}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <Box sx={{width: '100%'}}>
                                <Slider
                                    aria-label="Always visible"
                                    defaultValue={item?.percentage * 100}
                                    getAriaValueText={valuetext}
                                    valueLabelFormat={(value) => `Quorum ${value}%`}
                                    step={10}
                                    valueLabelDisplay="on"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='body1' color={'gray'}>
                                Ended: {item?.ended}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>))}
        </Grid>
    </Container>);
};

export default Govern;
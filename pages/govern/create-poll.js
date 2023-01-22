import React from 'react';
import {Button, Container, FormLabel, Grid, ListSubheader, Paper, TextField, Typography} from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const CreatePoll = () => {
    const [suggestionsOpen, setSuggestionsOpen] = React.useState(true);
    const [assetListingOpen, setAssetListingOpen] = React.useState(false);

    const [rewardDistributionOpen, setRewardDistributionOpen] = React.useState(false);
    const [parametersOpen, setParametersOpen] = React.useState(false);
    const [priceOracleOpen, setPriceOracleOpen] = React.useState(false);

    const handleClick = () => {
        setSuggestionsOpen(!suggestionsOpen);
    };
    return (
        <Container maxWidth="lg">
            <Typography variant={'h4'} sx={{my: 2, ml: 1}}>Create Poll</Typography>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <Paper elevation={3} sx={{borderRadius: '15px'}} >
                        <List
                            sx={{ width: '100%', maxWidth: '100%', }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            <ListItemButton onClick={handleClick} sx={{'& .MuiListItemText-primary': {fontSize: '1.75rem'}}}>
                                <ListItemText primary="Suggestions"  />
                                {suggestionsOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={suggestionsOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => setAssetListingOpen(!assetListingOpen)} sx={{'& .MuiListItemText-primary': {fontSize: '1.75rem'}}}>
                                <ListItemText primary="Suggestions"  />
                                {assetListingOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={assetListingOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => setRewardDistributionOpen(!rewardDistributionOpen)} sx={{'& .MuiListItemText-primary': {fontSize: '1.75rem'}}}>
                                <ListItemText primary="Suggestions"  />
                                {rewardDistributionOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={assetListingOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => setParametersOpen(!parametersOpen)} sx={{'& .MuiListItemText-primary': {fontSize: '1.75rem'}}}>
                                <ListItemText primary="Suggestions"  />
                                {parametersOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={assetListingOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                </List>
                            </Collapse>

                            <ListItemButton onClick={() => setPriceOracleOpen(!priceOracleOpen)} sx={{'& .MuiListItemText-primary': {fontSize: '1.75rem'}}}>
                                <ListItemText primary="Suggestions"  />
                                {priceOracleOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={assetListingOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                    <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText primary="Whitelist a new mAsset" />
                                    </ListItemButton>
                                </List>
                            </Collapse>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={7}>
                    <Paper elevation={3} sx={{padding: 3, borderRadius: '15px'}}>
                        <Grid container spacing={3} direction={'column'}>
                            <Grid item>
                                <Typography variant={'h4'} sx={{fontWeight: '500'}}>
                                    Submit Text Poll
                                </Typography>
                            </Grid>
                            <Grid item>
                                <FormLabel>TITLE</FormLabel>
                                <TextField fullWidth label="" id="fullWidth" sx={{ mt: 1 }} />
                            </Grid>
                            <Grid item>
                                <FormLabel>DESCRIPTION</FormLabel>
                                <TextField fullWidth label="" id="fullWidth"  sx={{ mt: 1 }} />
                            </Grid>
                            <Grid item>
                                <FormLabel>INFORMATION LINK (OPTIONAL)</FormLabel>
                                <TextField fullWidth label="URL for additional information" id="fullWidth" multiline={true}  minRows={4} sx={{ mt: 1 }} />
                            </Grid>
                            <Grid item>
                                <FormLabel>DEPOSIT</FormLabel>
                                <TextField fullWidth label=""  value={'1,000.000000 MIR'} id="fullWidth"  sx={{ mt: 1 }} />
                            </Grid>
                            <Grid item alignSelf={'center'} mt={1}>
                                <Button variant={'contained'} size={'large'}  sx={{backgroundColor: '#66adff', py: 1.5,px: 10, fontSize: '1.15rem', fontWeight: '600', color: 'white', borderRadius: '10px'}}>Connect Wallet</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreatePoll;
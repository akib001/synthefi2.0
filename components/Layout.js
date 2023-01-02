import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {alpha, styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import {InputBase, Menu, MenuItem, Typography} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {mainNavbarItems} from './data/adminNavBarItems';
import {useRouter} from 'next/router';
import { useTheme } from '@mui/material/styles';
import {useContext} from "react";
import ColorModeCtx from "../store/theme-context";

const drawerWidth = 240;

function Layout(props) {
    const { window } = props;

    const router = useRouter();
    const theme = useTheme();

    const colorMode = useContext(ColorModeCtx)

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
    );

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar>
                {/*<Typography variant="h6" noWrap component="div">*/}
                {/*</Typography>*/}
                {/*<Box*/}
                {/*    component="img"*/}
                {/*    sx={{*/}
                {/*        maxWidth: 165,*/}
                {/*        objectFit: 'contain',*/}
                {/*    }}*/}
                {/*    alt="Synthefi 2.0"*/}
                {/*    src="/logoBlack.png"*/}
                {/*/>*/}
                <Typography variant={'h5'} sx={{alignItems: 'center', fontWeight: 'bold'}}>Synthefi</Typography>
            </Toolbar>
            <Divider />
            <List>
                {mainNavbarItems.map((item, index) => (
                    <ListItem sx={{'& .Mui-selected': {
                            color: 'primary.main',
                        },}}  key={item.id} disablePadding>
                        <ListItemButton
                            selected={router.pathname == `/${item.route}`}
                            onClick={(event) => {
                                if(item.id == 5) {
                                    // handleLogout();
                                } else {
                                    handleListItemClick(event, item.id);
                                    router.push(item.route);
                                }
                            }}
                        >
                            <ListItemIcon sx={{color: `${router.pathname == `/${item.route}` ? 'primary.main' : 'white'}`}}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
                    >
                        {/*Dark Mode Button*/}

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                // color: 'text.primary',
                                borderRadius: 1,
                                textTransform: 'capitalize'
                            }}
                        >
                            {theme.palette.mode}
                            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Box>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {props.children}
                {renderMenu}
            </Box>
        </Box>
    );
}

Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Layout;

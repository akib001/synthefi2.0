import ProgressBar from '@badrap/bar-of-progress';
import {SnackbarProvider} from "notistack";
import Layout from "../components/Layout";
import Router from 'next/router';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const progress = new ProgressBar({
    size: 4,
    color: '#FE595E',
    className: 'z-50',
    delay: 100,
});

// Router.events.on whenever there is a change on router it dispatches a action
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);


export default function App({Component, pageProps}) {
    return <ThemeProvider theme={darkTheme}>
        <CssBaseline/><SnackbarProvider maxSnack={3}><Layout><Component {...pageProps} /></Layout></SnackbarProvider>
    </ThemeProvider>
}

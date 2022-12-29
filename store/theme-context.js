import * as React from 'react';
import {ThemeProvider, createTheme} from "@mui/material/styles";

const ColorModeCtx = React.createContext({ toggleColorMode: () => {} });

export const ColorModeCtxProvider = ({children}) => {
    const [mode, setMode] = React.useState('dark');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
            },
        }),
        [],
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ColorModeCtx.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeCtx.Provider>
    );
}

export default ColorModeCtx;

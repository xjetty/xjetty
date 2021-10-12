import '../styles/globals.css'
import {createTheme} from '@material-ui/core/styles'
import {blue, brown} from "@material-ui/core/colors";
import {AppContext} from "../contexts/AppContext";
import React, {useEffect, useState} from "react"
import {CssBaseline, ThemeProvider} from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {main: blue[500]},
        secondary: {main: brown[500]},
    }
})

function MyApp({Component, pageProps}) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles)
            jssStyles.parentElement.removeChild(jssStyles)
    }, [])
    return (
        <AppContext.Provider
            value={{}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Component {...pageProps} />
            </ThemeProvider>
        </AppContext.Provider>
    )
}

export default MyApp

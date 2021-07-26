import Head from "next/head";
import NavBarComponent from "./NavBarComponent";
import {Box, Container, makeStyles, Toolbar} from "@material-ui/core";
import SnackbarComponent from "./SnackbarComponent";
import RecaptchaFieldComponent from "./FieldComponents/RecaptchaFieldComponent";
import React, {useEffect} from "react";
import DialogComponent from "./DialogComponent";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1
    }
}))

const LayoutComponent = ({children}) => {
    const classes = useStyles()
    const [hidden, setHidden] = React.useState(true)
    useEffect(() => {
        setHidden(false)
    }, [setHidden])
    return (
        <div hidden={hidden}>
        <Head>
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            {/* eslint-disable-next-line @next/next/no-sync-scripts */}
            <script src="https://cdn.jsdelivr.net/npm/eosjs-api@7.0.4/lib/eos-api.min.js"/>
        </Head>
        <div className={classes.root}>
            <NavBarComponent/>
            <Toolbar/>
            <Container>
                <Box my={2}>
                    {children}
                </Box>
            </Container>
        </div>
        <SnackbarComponent/>
        <RecaptchaFieldComponent/>
        <DialogComponent/>
        </div>
    )
}

export default LayoutComponent
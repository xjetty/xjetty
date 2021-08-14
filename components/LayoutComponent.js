import NavBarComponent from "./NavBarComponent";
import {Box, Container, makeStyles, Toolbar} from "@material-ui/core";
import SnackbarComponent from "./SnackbarComponent";
import RecaptchaFieldComponent from "./FieldComponents/RecaptchaFieldComponent";
import React from "react";
import DialogComponent from "./DialogComponent";
import FooterComponent from "./FooterComponent";

const useStyles = makeStyles(() => ({
    root: {
        // flexGrow: 1
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }
}))

const LayoutComponent = ({children}) => {
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
                <NavBarComponent/>
                <Toolbar/>
                <Container className={classes.container}>
                    <Box my={2}>
                        {children}
                    </Box>
                </Container>
                <FooterComponent/>
            </div>
            <SnackbarComponent/>
            <RecaptchaFieldComponent/>
            <DialogComponent/>
        </>
    )
}

export default LayoutComponent
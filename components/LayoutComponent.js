import NavBarComponent from "./NavBarComponent";
import {Box, Container, Toolbar} from "@material-ui/core";
import SnackbarComponent from "./SnackbarComponent";
import RecaptchaFieldComponent from "./FieldComponents/RecaptchaFieldComponent";
import React from "react";
import DialogComponent from "./DialogComponent";

const LayoutComponent = ({children}) => {
    return (
        <>
            <NavBarComponent/>
            <Toolbar/>
            <Container>
                <Box my={2}>
                    {children}
                </Box>
            </Container>
            <SnackbarComponent/>
            <RecaptchaFieldComponent/>
            <DialogComponent/>
        </>
    )
}

export default LayoutComponent
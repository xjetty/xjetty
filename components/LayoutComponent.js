import NavBarComponent from "./NavBarComponent";
import {Box, Container, Grid, Toolbar, Typography} from "@material-ui/core";
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
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Copyright &#169; { new Date().getFullYear() } BlockCommerc. All Rights Reserved
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <SnackbarComponent/>
            <RecaptchaFieldComponent/>
            <DialogComponent/>
        </>
    )
}

export default LayoutComponent
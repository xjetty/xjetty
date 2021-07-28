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
    if (!hidden) {
        return (
            <>
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
            </>
        )
    } else return null
}

export default LayoutComponent
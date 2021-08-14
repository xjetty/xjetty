import {AppBar, makeStyles, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    title: {
        flexGrow: 1
    }
}))

const FooterComponent = () => {
    const classes = useStyles()
    return (
        <AppBar position="absolute" color="primary" className={classes.appBar}>
            <Toolbar variant="dense">
                <Typography variant="body1" className={classes.title}>
                    Copyright &#169; {new Date().getFullYear()} BlockCommerc
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default FooterComponent
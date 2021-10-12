import Head from "next/head";
import {Box, Button, Divider, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <html>
        <Head>
            <title>Home - Xjetty</title>
            <meta name="description"
                  content="Xjetty is an open-source project for a cross-border e-commerce website."/>
            <link href="https://xjetty.com" rel="canonical"/>
        </Head>
        <Grid container spacing={2}>
            <Grid item xs={12} container justifyContent="center">
                <Typography variant="h1">Xjetty</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Typography variant="h5" color="textSecondary">Cross-Border E-Commerce With XRP</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Box className={classes.buttons}>
                    <Button size="large" variant="contained" disableElevation color="primary">Sign up</Button>
                    <Button size="large" variant="contained" disableElevation color="secondary">Log in</Button>
                </Box>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Typography>OR</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent="center">
                <Button size="large" variant="outlined">Browse goods</Button>
            </Grid>
        </Grid>
        </html>
    )
}

export default Home
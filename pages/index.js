import Head from "next/head";
import {
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia,
    Grid,
    List,
    ListItem, ListItemIcon,
    ListItemText, ListSubheader,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Link from 'next/link'
import ContactFormComponent from "../components/FormComponents/ContactFormComponent";
import SendMessageActionComponent from "../components/ActionComponents/SendMessageActionComponent";
import GoToListingComponent from "../components/GoToListingComponent";
import {CheckCircle} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(20),
        backgroundSize: 'contain'
    }
}))

const Home = () => {
    const classes = useStyles()

    return (
        <>
            <Head>
                <title>Home - BlockCommerc</title>
            </Head>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardMedia
                            className={classes.media}
                            image='/logo.jpg'
                            title="BlockCommerc Logo"
                        />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        BlockCommerc
                                    </Typography>
                                    <Typography color="textSecondary">
                                        Commerce Made Easy on the Blockchain With EOS.IO Cryptocurrency
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <GoToListingComponent/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography color="textSecondary">
                                        OR
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link href="/create">
                                        <Button size="large" variant="contained" color="primary">Create a
                                            listing</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="secondary">
                                        BlockCommerc&apos;s built-in crypto payment processor and fixed quantities make
                                        voided crypto purchases a thing of the past and allow you to receive the exact
                                        amount you requested in USD or crypto.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <List subheader={<ListSubheader>Additionally</ListSubheader>}>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle color="secondary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="You pay no fees"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle color="secondary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="You can take offers"
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemIcon>
                                                <CheckCircle color="secondary"/>
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="And you can use an escrow"
                                            />
                                        </ListItem>
                                    </List>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Recommended Wallets
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <ButtonGroup
                                        orientation="vertical"
                                        variant="contained"
                                    >
                                        <Button variant="contained" href="https://exodus.com"
                                                target="_blank">Exodus</Button>
                                        <Button variant="contained" href="https://getwombat.io/"
                                                target="_blank">Wombat</Button>
                                        <Button variant="contained" href="https://greymass.com/en/anchor/"
                                                target="_blank">Anchor</Button>
                                        <Button variant="contained" href="https://guarda.com/"
                                                target="_blank">Guarda</Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        Contact BlockCommerc
                                    </Typography>
                                </Grid>
                                <ContactFormComponent/>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <SendMessageActionComponent/>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        Copyright &#169; { new Date().getFullYear() } BlockCommerc. All Rights Reserved
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default Home
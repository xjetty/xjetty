import Head from "next/head";
import {
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia,
    Grid,
    List,
    ListItem,
    ListItemText, ListSubheader,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Link from 'next/link'
import ContactFormComponent from "../components/FormComponents/ContactFormComponent";
import SendMessageActionComponent from "../components/ActionComponents/SendMessageActionComponent";
import GoToListingComponent from "../components/GoToListingComponent";

const useStyles = makeStyles({
    media: {
        height: 200,
        backgroundSize: 'contain',
        width: 'inherit',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

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
                    <CardContent>
                        <Typography variant="h5" component="h2" color="secondary">
                            Stop receiving more than one crypto payment for the same item. Receive the exact amount you requested in USD or crypto. Buyers don't enter amounts, you do.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
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
                                <Typography variant="h5" component="h2">
                                    BlockCommerc
                                </Typography>
                                <Typography color="textSecondary">
                                    The Way Commerce Should Be on the Blockchain, With EOS.IO Cryptocurrency
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <GoToListingComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography color="textSecondary">
                                    OR
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/create">
                                    <Button variant="contained" color="primary">Create a listing</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <List subheader={<ListSubheader>Features</ListSubheader>}>
                            <ListItem>
                                <ListItemText
                                    primary="Item quantities"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="No fees"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="And escrows"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" color="primary">
                            Thousands of transactions per second, near-instant transaction times, and zero percent transaction fees.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">
                                    Recommended Wallets
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup variant="contained"
                                             aria-label="contained primary button group">
                                    <Button href="https://greymass.com/en/anchor/" target="_blank">Anchor</Button>
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
                                <Typography variant="h5" component="h2">
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
        </Grid>
        </>
    )

}

export default Home
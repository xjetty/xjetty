import Head from "next/head";
import {
    Avatar,
    Box,
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia,
    Grid,
    Divider,
    List,
    ListItem, ListItemIcon,
    ListItemText, ListSubheader, Paper,
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
        height: 200,
        backgroundSize: 'contain',
        width: 'inherit',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
        textAlign: 'center',
        marginLeft: "auto",
        marginRight: 'auto'
    },
    centerText: {
        textAlign: 'center'
    },
    centerImage: {
        textAlign: 'center',
        marginLeft: "auto",
        marginRight: 'auto'
    }
}));

const Home = () => {
    const classes = useStyles()

    return (
        <html>
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
                            <Grid item xs={12} className={classes.centerText}>
                                <Typography variant="h5" component="h2">
                                    BlockCommerc
                                </Typography>
                                <Typography color="textSecondary">
                                    The Way Commerce Should Be on the Blockchain
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <Typography color="textSecondary">
                                    With,
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Avatar alt="EOSIO Logo" src="/eosio-logo.png" className={classes.large}/>
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <Typography color="textSecondary">
                                    EOS.IO Cryptocurrency
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12} style={{maxWidth: 300, marginLeft: 'auto', marginRight: 'auto'}}>
                                <GoToListingComponent/>
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <Typography color="textSecondary">
                                    OR
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <Link href="/create">
                                    <Button size="large" variant="contained" color="primary">Create a listing</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12} className={classes.centerText}>
                                <Typography variant="body2" color="textSecondary">
                                    Copyright &#169; {new Date().getFullYear()} BlockCommerc. All Rights Reserved
                                </Typography>
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
                                <Typography variant="h5" color="secondary">
                                    BlockCommerc&apos;s built-in crypto payment processor and fixed quantities make
                                    voided crypto purchases a thing of the past and allow you to receive the exact
                                    amount you requested in USD or crypto.
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <List subheader={<ListSubheader>Bonus Features</ListSubheader>}>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No fees"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Escrows"
                                />
                            </ListItem>
                        </List>
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
        </html>
    )

}

export default Home
import Head from "next/head";
import {
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia, Divider,
    Grid, IconButton,
    List,
    ListItem, ListItemIcon,
    ListItemText, ListSubheader,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Link from 'next/link'
import ContactFormComponent from "../components/FormComponents/ContactFormComponent";
import SendMessageActionComponent from "../components/ActionComponents/SendMessageActionComponent";
import GoToPostComponent from "../components/GoToPostComponent";
import {CheckCircle, Twitter} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(50),
        backgroundSize: 'contain'
    },
    buttons: {
        '& > *': {
            marginRight: theme.spacing(2),
        }
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <html>
        <Head>
            <title>Home - D2R Crypto, D2R Items, Diablo 2 Resurrected Items, D2R Store, D2R Trading, Buy D2R Items, D2R Items for Sale, Diablo 2 Resurrected Items for Sale</title>
            <meta name="description" content="Trade Diablo 2 Resurrected D2R items and services for crypto. Earn crypto in your own D2R store. Use crypto you earn to buy D2R items you don't have."/>
        </Head>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image='/logo.png'
                        title="D2R Crypto Logo"
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    D2R Crypto
                                </Typography>
                                <Typography color="textSecondary">
                                    Trade Diablo 2 Resurrected (D2R) Items and Services for Crypto (EOS)
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <GoToPostComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.buttons}>
                                    <Link href="/posts">
                                        <Button size="large" variant="contained" color="secondary">Browse
                                            posts</Button>
                                    </Link>
                                    <Link href="/create">
                                        <Button size="large" variant="outlined" color="primary">Create a
                                            post</Button>
                                    </Link>
                                </div>
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
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Built-in crypto payment processor"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Fixed item quantities"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="USD or crypto fixed amounts"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Multiple sale methods, including offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Does not require an account"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No fee of any kind"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="An escrow for security"
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
                                <Typography variant="h6">
                                    Recommended Wallets
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonGroup
                                    orientation="vertical"
                                    variant="outlined"
                                    color="primary"
                                >
                                    <Button href="https://exodus.com"
                                            target="_blank">Exodus</Button>
                                    <Button href="https://getwombat.io/"
                                            target="_blank">Wombat</Button>
                                    <Button href="https://greymass.com/en/anchor/"
                                            target="_blank">Anchor</Button>
                                    <Button href="https://guarda.com/"
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
                                    Contact Us
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
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2">
                    Copyright &#169; {new Date().getFullYear()} D2R Crypto. All Rights Reserved.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <IconButton href="https://twitter.com/d2rcrypto" target="_blank" color="primary">
                    <Twitter/>
                </IconButton>
            </Grid>
        </Grid>
        </html>
    )
}

export default Home
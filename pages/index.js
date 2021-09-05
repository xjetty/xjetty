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
import GoToListingComponent from "../components/GoToListingComponent";
import {CheckCircle, EmojiEvents, Twitter} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(20),
        backgroundSize: 'contain'
    }
}))

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
                            <Grid item xs={12}>
                                <Typography variant="h5">
                                    BlockCommerc
                                </Typography>
                                <Typography color="textSecondary">
                                    Commerce With EOS Cryptocurrency
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <GoToListingComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/create">
                                    <Button size="large" variant="contained" color="primary">Create a
                                        listing</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/public">
                                    <Button size="large" variant="contained" color="secondary">View public
                                        listings</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="subtitle1">
                            BlockCommerc&apos;s built-in crypto payment processor and fixed item quantities make voided
                            crypto purchases a thing of the past.
                            Receive the exact amount you listed in USD or crypto.
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <List subheader={<ListSubheader>Additionally,</ListSubheader>}>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Pay no fees"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Take offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="And use an escrow"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <List subheader={<ListSubheader>EOS</ListSubheader>}>
                            <ListItem>
                                <ListItemIcon>
                                    <EmojiEvents color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="2,800 transactions per second"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <EmojiEvents color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="0.5s transaction times"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <EmojiEvents color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="0% transaction fees"
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
                                    variant="contained"
                                    color="primary"
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
                    Copyright &#169; {new Date().getFullYear()} BlockCommerc. All Rights Reserved.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <IconButton href="https://twitter.com/BlockCommerc" target="_blank" color="primary">
                    <Twitter/>
                </IconButton>
            </Grid>
        </Grid>
        </html>
    )
}

export default Home
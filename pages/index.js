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
            <title>Home - BlockCommerc</title>
            <meta name="description"
                  content=""/>
        </Head>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
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
                                <Typography color="textSecondary" component="h1">
                                    Commerce on the Blockchain With EOS – Compare to a Crypto eBay or Crypto Amazon but With No Fees, No Sign Up, and No Identity Checks
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <GoToListingComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={classes.buttons}>
                                    <Link href="/listings">
                                        <Button size="large" variant="contained" color="primary">Browse
                                            listings</Button>
                                    </Link>
                                    <Link href="/create">
                                        <Button size="large" variant="outlined" color="secondary">Create a
                                            listing</Button>
                                    </Link>
                                </div>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <List subheader={<ListSubheader>Features</ListSubheader>}>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="A built-in crypto payment processor"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Fixed item quantities"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="USD or crypto fixed amounts"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Multiple sale methods, including offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No sign up required"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No fee whatsoever"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="An escrow for protection"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant="outlined">
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
                <Card variant="outlined">
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
                <Card variant="outlined">
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
                <IconButton href="https://twitter.com/blockcommerc" target="_blank" color="primary">
                    <Twitter/>
                </IconButton>
            </Grid>
        </Grid>
        </html>
    )
}

export default Home
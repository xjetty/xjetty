import Head from "next/head";
import {
    Avatar,
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia, Divider,
    Grid, IconButton,
    List,
    ListItem, ListItemAvatar, ListItemIcon,
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
            <title>Home - BlockCommerc, Blockchain Commerce or E-Commerce Website, Alternative to eBay and Amazon,
                Compare to a Crypto eBay or Crypto Amazon</title>
            <meta name="description"
                  content="BlockCommerc Is a Blockchain Commerce or E-Commerce Website That Is an Alternative to eBay and Amazon. Compare to a Crypto eBay or Crypto Amazon but With No Fees, No Signup, and No Identity Checks."/>
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
                                    Commerce (or E-Commerce) on the Blockchain With EOS Cryptocurrency – An Alternative
                                    to eBay and
                                    Amazon, Like a Crypto eBay or Crypto Amazon but With No Fees, No Signup, and No
                                    Identity Checks
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <GoToListingComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/listings">
                                    <Button size="large" variant="contained" color="primary">Browse
                                        listings</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/create">
                                    <Button size="large" variant="outlined" color="secondary">Create a
                                        listing</Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <List subheader={<ListSubheader>Fee Comparison</ListSubheader>}>
                            <ListItem divider>
                                <ListItemText primary="Amazon" secondary="15%"/>
                            </ListItem>
                            <ListItem divider>
                                <ListItemText primary="eBay" secondary="10%"/>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="BlockCommerc" secondary="0%"/>
                            </ListItem>
                        </List>
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
                                    primary="A Built-In Crypto Payment Processor"
                                    secondary="Current crypto e-commerce methods involve sending crypto manually off-site to a
                                    wallet address. On BlockCommerc, transactions occur on-site, and therefore make voided crypto
                                    purchases a thing of the past. With near-instant transaction times of EOS cryptocurrency, there is
                                    no need to wait for payment approvals. These transaction speeds allow BlockCommerc to assess transactions
                                    rapidly and accept or reject them, similar to fiat (USD) transactions on eBay and Amazon. A buyer
                                    no longer has to question the acceptance of their payment."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Item Quantities"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="USD or Crypto Fixed Amounts"
                                    secondary="Conventional crypto payment methods only send the approximate amount of crypto equivalent to the dollar
                                    (USD). BlockCommerc allows the USD amount of crypto to be fixed (and the EOS amount too) similar to eBay and Amazon."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Multiple Sale Methods, Including Offers"
                                    secondary="Similar to eBay, buyers on BlockCommerc can take offers.
                                    There are three sale methods on BlockCommerc: Asking price only, Asking price or offers, and Offers only.
                                    The latter two require a maximum percent less than (the asking price) and a minimum amount defined, respectively."
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No Signup Required"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No Fee Whatsoever"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="An Escrow for Protection (Optional)"
                                    secondary="Both eBay and Amazon protect both buyers and sellers. On BlockCommerc, an escrow protects them.
                                    As the buyer approves a purchase, the respective payment releases to the seller."
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <List subheader={<ListSubheader>EOS Cryptocurrency</ListSubheader>}>
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
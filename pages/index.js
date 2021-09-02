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
import {CheckCircle, Copyright, EmojiEvents} from '@material-ui/icons'

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
                                        Blockchain Commerce With EOS
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={4}>
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
                                        <Button size="large" variant="contained" color="secondary">View public listings</Button>
                                    </Link>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="secondary">
                                BlockCommerc&apos;s built-in crypto payment processor and fixed item quantities
                                make voided crypto purchases a thing of the past and allow you to receive the
                                exact amount you listed in USD or crypto.
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
            </Grid>
        </>
    )
}

export default Home
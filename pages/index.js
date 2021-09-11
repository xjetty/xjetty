import Head from "next/head";
import {
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia, Divider,
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
import GoToPostComponent from "../components/GoToPostComponent";
import {CheckCircle} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(50),
        backgroundSize: 'contain'
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <html>
        <Head>
            <title>Home - D2R Crypto</title>
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
                                <Link href="/posts">
                                    <Button size="large" variant="contained" color="primary">View
                                        posts</Button>
                                </Link>
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/create">
                                    <Button size="large" variant="contained" color="secondary">Create a
                                        post</Button>
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
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No accounts"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No fees"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
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
                    Copyright &#169; {new Date().getFullYear()} D2R Crypto. All Rights Reserved.
                </Typography>
            </Grid>
        </Grid>
        </html>
    )
}

export default Home
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
            <title>Home - D2R Crypto</title>
        </Head>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
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
                                        <Button size="large" variant="contained" color="primary">View
                                            posts</Button>
                                    </Link>
                                    <Link href="/create">
                                        <Button size="large" variant="outlined" color="secondary">Create a
                                            post</Button>
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
                                    primary="Built-in crypto payment processor"
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
                                    primary="Does not require an account"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No fee of any kind"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <CheckCircle color="secondary"/>
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
                    Copyright &#169; {new Date().getFullYear()} D2R Crypto. All Rights Reserved.
                </Typography>
            </Grid>
        </Grid>
        </html>
    )
}

export default Home
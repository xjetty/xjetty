import Head from "next/head";
import {
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link'
import StarIcon from '@material-ui/icons/Star'
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
    },
    title: {
        fontSize: 14,
    },
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
                <GoToListingComponent/>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image='/logo.jpg'
                        title="BlockCommerc Logo"
                    />
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Making Commerce on the Blockchain Simple
                        </Typography>
                        <Typography variant="h5" component="h2">
                            BlockCommerc
                        </Typography>
                        <Typography color="textSecondary">
                            Share a Code, Make Sales
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="No fees whatsoever"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Set the item quantity"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Fix by fiat or crypto"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Choose to accept offers"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LinkIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Use the escrow to gain trust"
                                />
                            </ListItem>
                        </List>
                    </CardContent>
                    <CardActions>
                        <Link href="/create">
                            <Button variant="contained" color="primary">Create a listing</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Built Around the EOS.IO Network
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Thousands of transactions per second"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Near-instant transaction times"
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <StarIcon color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary="Zero percent transaction fees"
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
        </>
    )

}

export default Home
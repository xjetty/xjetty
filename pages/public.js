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
import WorldwideFieldComponent from "../components/FieldComponents/WorldwideFieldComponent";
import CountriesFieldComponent from "../components/FieldComponents/CountriesFieldComponent";
import {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import SearchFieldComponent from "../components/FieldComponents/SearchFieldComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(15),
        backgroundSize: 'contain'
    }
}))

const Public = () => {
    const classes = useStyles()
    const {worldwide, search} = useContext(AppContext)

    return (
        <html>
            <Head>
                <title>Public Listings - BlockCommerc</title>
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
                                    <WorldwideFieldComponent/>
                                </Grid>
                                {!worldwide && (<Grid item xs={12}>
                                    <CountriesFieldComponent/>
                                </Grid>)}
                                <Grid item xs={12}>
                                    <SearchFieldComponent/>
                                </Grid>
                                {/*add switch for worldwide*/}
                                {/*save option in localstorage*/}
                                {/*get listings based on value in localstorage if not in localstorage assume worldwide*/}
                                {/*add search box*/}

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </html>
    )
}

export default Public
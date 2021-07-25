import {
    AppBar,
    Card,
    CardContent, CardMedia,
    Grid, Tab
} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import LinkFieldComponent from './FieldComponents/LinkFieldComponent'
import ListingOptionsFormComponent from "./FormComponents/ListingOptionsFormComponent";
import UpdateListingFormComponent from "./FormComponents/UpdateListingFormComponent";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {makeStyles} from "@material-ui/core/styles";
import {AppContext} from "../contexts/AppContext";
import OffersTableComponent from "./OffersTableComponent";
import CodeFieldComponent from "./FieldComponents/CodeFieldComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: 100,
        backgroundSize: 'contain',
        width: 'inherit',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary
    }
}))

const ManagerComponent = () => {
    const classes = useStyles()
    const {offers, showOffers} = useContext(AppContext)
    const [tabValue, setTabValue] = React.useState('1')
    const [newOffers, setNewOffers] = React.useState(false)
    useEffect(() => {
        let newOffersValue = false
        offers.every(value => {
            if (value.status === 'Accept or Decline') {
                newOffersValue = true
                return false
            } else
                return true
        })
        setNewOffers(newOffersValue)
    }, [offers])
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }
    return (
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
                            <Grid item xs={12} md={6}>
                                <CodeFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LinkFieldComponent/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {(showOffers && offers.length) ? (<TabContext value={tabValue}>
                    <AppBar position="static">
                        <TabList onChange={handleTabChange}>
                            <Tab label="Listing options" value="1"/>
                            <Tab label="Update listing" value="2"/>
                            <Tab label={newOffers ? 'Offers (new)' : 'Offers'} value="3"/>
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <ListingOptionsFormComponent/>
                    </TabPanel>
                    <TabPanel value="2">
                        <UpdateListingFormComponent/>
                    </TabPanel>
                    <TabPanel value="3">
                        <OffersTableComponent/>
                    </TabPanel>
                </TabContext>) : (
                    <TabContext value={tabValue}>
                        <AppBar position="static">
                            <TabList onChange={handleTabChange}>
                                <Tab label="Listing options" value="1"/>
                                <Tab label="Update listing" value="2"/>
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <ListingOptionsFormComponent/>
                        </TabPanel>
                        <TabPanel value="2">
                            <UpdateListingFormComponent/>
                        </TabPanel>
                    </TabContext>
                )}
            </Grid>
        </Grid>
    )
}

export default ManagerComponent

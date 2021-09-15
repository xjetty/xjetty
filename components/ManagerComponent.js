import {
    AppBar,
    Card,
    CardContent, CardMedia,
    Grid, Tab
} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import LinkFieldComponent from './FieldComponents/LinkFieldComponent'
import PostOptionsFormComponent from "./FormComponents/PostOptionsFormComponent";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {makeStyles} from "@material-ui/core/styles";
import {AppContext} from "../contexts/AppContext";
import OffersTableComponent from "./OffersTableComponent";
import CodeFieldComponent from "./FieldComponents/CodeFieldComponent";
import CreateUpdateFormPostComponent from "./FormComponents/CreateUpdateFormPostComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
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

const ManagerComponent = ({token}) => {
    const classes = useStyles()
    const {offers, showOffers} = useContext(AppContext)
    const [tabValue, setTabValue] = React.useState('1')
    const [newOffers, setNewOffers] = React.useState(false)
    useEffect(() => {
        let newOffersValue = false
        offers.every(value => {
            if (value.status === 'Pending decision') {
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
                        image='/logo.png'
                        title="D2R Crypto Logo"
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <CodeFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <LinkFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                {(showOffers && offers.length) ? (<TabContext value={tabValue}>
                                    <AppBar position="static">
                                        <TabList onChange={handleTabChange}>
                                            <Tab label="Post options" value="1"/>
                                            <Tab label="Update Post" value="2"/>
                                            <Tab label={newOffers ? 'Offers (new)' : 'Offers'} value="3"/>
                                        </TabList>
                                    </AppBar>
                                    <TabPanel value="1">
                                        <PostOptionsFormComponent token={token}/>
                                    </TabPanel>
                                    <TabPanel value="2">
                                        <CreateUpdateFormPostComponent create={false} token={token}/>
                                    </TabPanel>
                                    <TabPanel value="3">
                                        <OffersTableComponent token={token}/>
                                    </TabPanel>
                                </TabContext>) : (
                                    <TabContext value={tabValue}>
                                        <AppBar position="static">
                                            <TabList onChange={handleTabChange}>
                                                <Tab label="Post options" value="1"/>
                                                <Tab label="Update Post" value="2"/>
                                            </TabList>
                                        </AppBar>
                                        <TabPanel value="1">
                                            <PostOptionsFormComponent token={token}/>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <CreateUpdateFormPostComponent create={false} token={token}/>
                                        </TabPanel>
                                    </TabContext>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>

        </Grid>
    )
}

export default ManagerComponent

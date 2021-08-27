import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Card,
    CardContent, CardMedia,
    Grid, IconButton, ImageListItemBar,
    List,
    ListItem, ListItemIcon,
    ListItemText, MuiThemeProvider, Paper,
    Tab,
    Typography
} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {createTheme, makeStyles} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {AppContext} from '../contexts/AppContext'
import BuyItNowFormComponent from "./FormComponents/BuyItNowFormComponent";
import MakeOfferFormComponent from "./FormComponents/MakeOfferFormComponent";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import WarningIcon from '@material-ui/icons/Warning';
import PublicIcon from '@material-ui/icons/Public'
import {green, red} from "@material-ui/core/colors";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    media: {
        height: 100,
        backgroundSize: 'contain',
        width: 'inherit',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    imageList: {
        width: 500,
        height: 500,
        // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}))

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

const eosFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
})

const greenTheme = createTheme({palette: {primary: green}})
const redTheme = createTheme({palette: {primary: red}})

function StarBorderIcon() {
    return null;
}

const ListingComponent = () => {
    const classes = useStyles()

    const {
        title,
        description,
        saleMethod,
        fixedAmount,
        useEscrow,
        offer,
        usdAmountLabel,
        eosAmountLabel,
        setUsdAmountLabel,
        setEosAmountLabel,
        usdAmountValue,
        eosAmountValue,
        eosRate,
        publicListing,
        worldwide,
        countries,
        imageLinks,
    } = useContext(AppContext)

    useEffect(() => {
        if (fixedAmount === 'usd') {
            setUsdAmountLabel(`${usdFormatter.format(usdAmountValue)} USD`)
            setEosAmountLabel(
                `${eosFormatter
                    .format(usdAmountValue / eosRate)
                    .replace('$', '')} EOS`
            )
        } else {
            setUsdAmountLabel(
                `${usdFormatter.format(eosAmountValue * eosRate)} USD`
            )
            setEosAmountLabel(
                `${eosFormatter.format(eosAmountValue).replace('$', '')} EOS`
            )
        }
    }, [])

    useEffect(() => {
        if (fixedAmount === 'usd') {
            setEosAmountLabel(
                `${eosFormatter
                    .format(usdAmountValue / eosRate)
                    .replace('$', '')} EOS`
            )
        } else
            setUsdAmountLabel(
                `${usdFormatter.format(eosAmountValue * eosRate)} USD`
            )
    }, [eosRate])

    const [tabValue, setTabValue] = React.useState('1')

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
                            <Grid item xs={12}>
                                <Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography
                                            className={classes.heading}>
                                            {title}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <span dangerouslySetInnerHTML={{__html: description}}/>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography
                                            className={classes.heading}>
                                            Images
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img style={{maxHeight: '500px', maxWidth: '500px'}} src={imageLinks[0]}/>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            <Grid item xs={12}>
                                <List>
                                    {(saleMethod !== 'offersOnly' || offer) && (
                                        <>
                                            <ListItem>
                                                <ListItemText
                                                    primary={usdAmountLabel}
                                                    secondary={
                                                        fixedAmount ===
                                                        'usd'
                                                            ? 'Fixed'
                                                            : ''
                                                    }
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary={eosAmountLabel}
                                                    secondary={
                                                        fixedAmount ===
                                                        'eos'
                                                            ? 'Fixed'
                                                            : ''
                                                    }
                                                />
                                            </ListItem>
                                        </>
                                    )}
                                    <ListItem>
                                        <ListItemIcon>
                                            {useEscrow ? (<MuiThemeProvider theme={greenTheme}><VerifiedUserIcon
                                                color="primary"/></MuiThemeProvider>) : (
                                                <MuiThemeProvider theme={redTheme}><WarningIcon
                                                    color="primary"/></MuiThemeProvider>)}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={
                                                useEscrow
                                                    ? 'Escrow in use'
                                                    : 'Escrow not in use'
                                            }
                                        />
                                    </ListItem>
                                    {publicListing && (<ListItem>
                                        <ListItemIcon>
                                            <PublicIcon color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={worldwide ? 'Worldwide' : countries.join(', ')}
                                        />
                                    </ListItem>)}
                                </List>
                            </Grid>
                            <Grid item xs={12}>
                                {saleMethod === 'askingPriceAndOffers' && !offer ? (
                                    <TabContext value={tabValue}>
                                        <AppBar position="static">
                                            <TabList onChange={handleTabChange}>
                                                <Tab label="Buy it now" value="1"/>
                                                <Tab label="Make offer" value="2"/>
                                            </TabList>
                                        </AppBar>
                                        <TabPanel value="1">
                                            <BuyItNowFormComponent/>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <MakeOfferFormComponent/>
                                        </TabPanel>
                                    </TabContext>
                                ) : saleMethod === 'askingPriceOnly' || offer ? (
                                    <TabContext value={tabValue}>
                                        <AppBar position="static">
                                            <TabList onChange={handleTabChange}>
                                                <Tab label="Buy it now" value="1"/>
                                                <Tab label="Make offer" disabled/>
                                            </TabList>
                                        </AppBar>
                                        <TabPanel value="1">
                                            <BuyItNowFormComponent/>
                                        </TabPanel>
                                    </TabContext>
                                ) : (
                                    <TabContext value={tabValue}>
                                        <AppBar position="static">
                                            <TabList onChange={handleTabChange}>
                                                <Tab label="Buy it now" disabled/>
                                                <Tab label="Make offer" value="1"/>
                                            </TabList>
                                        </AppBar>
                                        <TabPanel value="1">
                                            <MakeOfferFormComponent/>
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

export default ListingComponent

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar, Button, ButtonGroup,
    Card,
    CardContent, CardMedia, Divider,
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
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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

const ListingComponent = () => {
    const classes = useStyles()
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

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
    const [imageNumber, setImageNumber] = React.useState(0)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const nextImage = () => {
        setImageNumber(imageNumber + 1)
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
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <img alt="Image" src={imageLinks[0]} style={{width: '100%', maxWidth: '500px', height: "auto"}}/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                                                    <Button>Prev</Button>
                                                    <Button>Next</Button>
                                                </ButtonGroup>
                                            </Grid>
                                        </Grid>
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

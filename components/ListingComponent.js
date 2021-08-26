import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar,
    Card,
    CardContent, CardMedia,
    Grid,
    List,
    ListItem, ListItemIcon,
    ListItemText, MuiThemeProvider,
    Tab,
    Typography
} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {createTheme, makeStyles} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {AppContext} from '../contexts/AppContext'
import BuyItNowFormComponent from "./FormComponents/BuyItNowFormComponent";
import MakeOfferFormComponent from "./FormComponents/MakeOfferFormComponent";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
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
        eosRate
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
            {/*<Grid item xs={12}>*/}
            {/*    <Accordion defaultExpanded={true}>*/}
            {/*        <AccordionSummary*/}
            {/*            expandIcon={<ExpandMoreIcon/>}>*/}
            {/*            <Typography*/}
            {/*                className={classes.heading}>*/}
            {/*                {title}*/}
            {/*            </Typography>*/}
            {/*        </AccordionSummary>*/}
            {/*        <AccordionDetails>*/}
            {/*            <Typography>*/}
            {/*                <span dangerouslySetInnerHTML={{__html: description}}/>*/}
            {/*            </Typography>*/}
            {/*        </AccordionDetails>*/}
            {/*    </Accordion>*/}
            {/*</Grid>*/}
            <Grid item xs={12}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image='/logo.jpg'
                        title="BlockCommerc Logo"
                    />
                    <CardContent>
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
                                    {useEscrow ? (<MuiThemeProvider theme={greenTheme}><CheckIcon
                                        color="primary"/></MuiThemeProvider>) : (
                                        <MuiThemeProvider theme={redTheme}><ClearIcon
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
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                {saleMethod === 'askingPriceAndOffers' && !offer ? (
                    <TabContext value={tabValue}>
                        <AppBar position="static">
                            <TabList onChange={handleTabChange}>
                                <Tab label="Buy It Now" value="1"/>
                                <Tab label="Make Offer" value="2"/>
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
                                <Tab label="Buy It Now" value="1"/>
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
                                <Tab label="Make Offer" value="1"/>
                            </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <MakeOfferFormComponent/>
                        </TabPanel>
                    </TabContext>
                )}
            </Grid>
        </Grid>
    )
}

export default ListingComponent

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar, Avatar, Button, ButtonGroup,
    Card,
    CardContent, CardMedia, Chip, Divider,
    Grid,
    List,
    ListItem, ListItemAvatar, ListItemIcon,
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
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import {Create, OpenInNew, Update, VerifiedUser, Warning} from "@material-ui/icons";
import {Public} from "@material-ui/icons";
import {green, orange} from "@material-ui/core/colors";
import {eosFormatter} from '../eosFormatter'
import {usdFormatter} from '../usdFormatter'

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
    }
}))

const greenTheme = createTheme({palette: {primary: green}})
const orangeTheme = createTheme({palette: {primary: orange}})

const ListingComponent = ({code}) => {
    const classes = useStyles()
    const {
        title,
        description,
        saleMethod,
        fixedAmount,
        offer,
        usdAmountLabel,
        eosAmountLabel,
        setUsdAmountLabel,
        setEosAmountLabel,
        usdAmountValue,
        eosAmountValue,
        eosRate,
        imageLinks,
        createdOnTimestamp,
        lastUpdatedOnTimestamp,
        useEscrow,
        worldwide,
        countries,
        link,
        condition,
        quantity
    } = useContext(AppContext)

    const setLabels = () => {
        if (fixedAmount === 'usd') {
            setUsdAmountLabel(`${usdFormatter.format(usdAmountValue * quantity)} USD`)
            setEosAmountLabel(
                `${eosFormatter
                    .format((usdAmountValue * quantity) / eosRate)
                    .replace('$', '')} EOS`
            )
        } else {
            setUsdAmountLabel(
                `${usdFormatter.format(eosAmountValue * quantity * eosRate)} USD`
            )
            setEosAmountLabel(
                `${eosFormatter.format(eosAmountValue * quantity).replace('$', '')} EOS`
            )
        }
    }

    useEffect(() => {
        setLabels()
    }, [])

    useEffect(() => {
        setLabels()
    }, [eosRate, quantity])

    const datetimeOptions = {
        day: 'numeric',
        month: 'long',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    }

    const getDatetime = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', datetimeOptions)
    }

    const [tabValue, setTabValue] = React.useState('1')
    const [imageNumber, setImageNumber] = React.useState(0)
    const [imageCount, setImageCount] = React.useState(0)

    useEffect(() => {
        setImageCount(imageLinks.length)
    }, [])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const prevImage = () => {
        const images = imageLinks.length
        if (imageNumber === 0) {
            setImageNumber(images - 1)
        } else {
            setImageNumber(imageNumber - 1)
        }
    }

    const nextImage = () => {
        const images = imageLinks.length
        if (imageNumber >= images - 1) {
            setImageNumber(0)
        } else {
            setImageNumber(imageNumber + 1)
        }
    }

    const openImage = () => {
        const image = imageLinks[imageNumber]
        window.open(image, '_blank')
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardMedia
                        className={classes.media}
                        image='/logo.jpg'
                        title="BlockCommerc Logo"
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Chip color="secondary"
                                      label={condition !== 'Not applicable' ? condition : 'Condition does not apply'}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Accordion defaultExpanded={true}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>
                                            Title
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="h6">
                                            {title}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                {description && (<Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>
                                            Description
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            <span dangerouslySetInnerHTML={{__html: description}}/>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>)}
                                {(imageLinks.length >= 1 && imageLinks[0]) ? (<Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>
                                            Images
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <img
                                                    style={{width: '100%', maxWidth: '500px', height: "auto"}}
                                                    src={imageLinks[imageNumber]}
                                                    alt="Image"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Chip label={`${imageNumber + 1}/${imageCount}`} variant="outlined"
                                                      color="primary"/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                {imageLinks.length > 1 ? (
                                                    <ButtonGroup variant="text" color="primary">
                                                        <Button disabled={imageNumber === 0}
                                                                onClick={prevImage}>Prev</Button>
                                                        <Button disabled={imageNumber === imageCount - 1}
                                                                onClick={nextImage}>Next</Button>
                                                        <Button onClick={openImage} endIcon={<OpenInNew/>}>Open</Button>
                                                    </ButtonGroup>) : (
                                                    <ButtonGroup variant="text" color="primary">
                                                        <Button onClick={openImage} endIcon={<OpenInNew/>}>Open</Button>
                                                    </ButtonGroup>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>) : ('')}
                                {!offer && (<Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography>
                                            Specifics
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List disablePadding>
                                            <ListItem disableGutters>
                                                <ListItemIcon>
                                                    <Create/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={getDatetime(createdOnTimestamp)}
                                                />
                                            </ListItem>
                                            {createdOnTimestamp !== lastUpdatedOnTimestamp && (
                                                <ListItem disableGutters>
                                                    <ListItemIcon>
                                                        <Update/>
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={getDatetime(lastUpdatedOnTimestamp)}
                                                    />
                                                </ListItem>)}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>)}
                            </Grid>
                            {(saleMethod !== 'offersOnly' || offer) ? (<Grid item xs={12}>
                                <Card elevation={6}>
                                    <CardContent>
                                        <List disablePadding>
                                            <ListItem disableGutters>
                                                <ListItemIcon>
                                                    <Public color="primary"/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={worldwide ? 'Worldwide' : countries.join(', ')}
                                                />
                                            </ListItem>
                                            <ListItem disableGutters>
                                                <ListItemIcon>
                                                    {useEscrow ? (<MuiThemeProvider theme={greenTheme}><VerifiedUser
                                                        color="primary"/></MuiThemeProvider>) : (
                                                        <MuiThemeProvider theme={orangeTheme}><Warning
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
                                            <ListItem disableGutters divider>
                                                {fixedAmount !== 'usd' && (<ListItemAvatar>
                                                    <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                            src="/eos-logo.svg"/>
                                                </ListItemAvatar>)}
                                                <ListItemText
                                                    primary={fixedAmount === 'usd' ? usdAmountLabel : eosAmountLabel}
                                                    secondary="Fixed"
                                                />
                                            </ListItem>
                                            <ListItem disableGutters>
                                                {fixedAmount === 'usd' && (<ListItemAvatar>
                                                    <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                            src="/eos-logo.svg"/>
                                                </ListItemAvatar>)}
                                                <ListItemText
                                                    primary={fixedAmount !== 'usd' ? usdAmountLabel : eosAmountLabel}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>) : (<List disablePadding> <ListItem disableGutters>
                                <ListItemIcon>
                                    <Public color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={worldwide ? 'Worldwide' : countries.join(', ')}
                                />
                            </ListItem> <ListItem disableGutters>
                                <ListItemIcon>
                                    {useEscrow ? (<MuiThemeProvider theme={greenTheme}><VerifiedUser
                                        color="primary"/></MuiThemeProvider>) : (
                                        <MuiThemeProvider theme={orangeTheme}><Warning
                                            color="primary"/></MuiThemeProvider>)}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        useEscrow
                                            ? 'Escrow in use'
                                            : 'Escrow not in use'
                                    }
                                />
                            </ListItem></List>)}
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
                                            <BuyItNowFormComponent code={code}/>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <MakeOfferFormComponent code={code}/>
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
                                            <BuyItNowFormComponent code={code}/>
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
                                            <MakeOfferFormComponent code={code}/>
                                        </TabPanel>
                                    </TabContext>
                                )}
                            </Grid>
                            {offer && (
                                <>
                                    <Grid item xs={12}>
                                        <Divider/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button href={link} target="_blank" variant="text" color="primary"
                                                endIcon={<OpenInNew/>}>Original listing</Button>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ListingComponent

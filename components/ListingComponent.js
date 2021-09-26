import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar, Avatar, Button, ButtonGroup,
    Card,
    CardContent, CardMedia, Divider,
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
import {Create, NavigateBefore, NavigateNext, OpenInNew, Update, VerifiedUser, Warning} from "@material-ui/icons";
import {Public} from "@material-ui/icons";
import {green, orange, red} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
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

const greenTheme = createTheme({palette: {primary: green}})
const orangeTheme = createTheme({palette: {primary: orange}})

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
        publicListing,
        useEscrow,
        worldwide,
        countries,
        link
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
                                <Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography
                                            className={classes.heading}>
                                            Title
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
                                            {title}
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                {description && (<Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography
                                            className={classes.heading}>
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
                                        <Typography
                                            className={classes.heading}>
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
                                                {imageLinks.length > 1 ? (
                                                    <ButtonGroup variant="text" color="primary">
                                                        <Button onClick={prevImage}>Prev</Button>
                                                        <Button onClick={nextImage}>Next</Button>
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
                                        <Typography
                                            className={classes.heading}>
                                            Specifics
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography>
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
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>)}
                            </Grid>
                            {(saleMethod !== 'offersOnly' || offer) ? (<Grid item xs={12}>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Public color="primary"/>
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={worldwide ? 'Worldwide' : countries.join(', ')}
                                        />
                                    </ListItem>
                                    <ListItem>
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
                                    <ListItem divider>
                                        {fixedAmount !== 'usd' && (<ListItemAvatar>
                                            <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                    src="/eos-logo.svg"/>
                                        </ListItemAvatar>)}
                                        <ListItemText
                                            primary={fixedAmount === 'usd' ? usdAmountLabel : eosAmountLabel}
                                            secondary="Fixed"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        {fixedAmount === 'usd' && (<ListItemAvatar>
                                            <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                    src="/eos-logo.svg"/>
                                        </ListItemAvatar>)}
                                        <ListItemText
                                            primary={fixedAmount !== 'usd' ? usdAmountLabel : eosAmountLabel}
                                        />
                                    </ListItem>
                                </List>
                            </Grid>) : (<List> <ListItem>
                                <ListItemIcon>
                                    <Public color="primary"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={worldwide ? 'Worldwide' : countries.join(', ')}
                                />
                            </ListItem> <ListItem>
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
                                                endIcon={<OpenInNew/>}>Original post</Button>
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

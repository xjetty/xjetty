import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    AppBar, Avatar, Button,
    Card,
    CardContent, CardMedia, Divider,
    Grid,
    List,
    ListItem, ListItemAvatar,
    ListItemText,
    Tab,
    Typography
} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {AppContext} from '../contexts/AppContext'
import BuyItNowFormComponent from "./FormComponents/BuyItNowFormComponent";
import MakeOfferFormComponent from "./FormComponents/MakeOfferFormComponent";
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import ImageLinkPreviewComponent from "./ImageLinkPreviewComponent";
import {OpenInNew} from "@material-ui/icons";

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

const PostComponent = ({code}) => {
    const classes = useStyles()
    const {
        mode,
        platforms,
        category,
        subcategory,
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
        imageLink,
        createdOnTimestamp,
        lastUpdatedOnTimestamp,
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
                                {description && (<Accordion>
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
                                {imageLink && (<Accordion defaultExpanded={true}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography
                                            className={classes.heading}>
                                            Image
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <ImageLinkPreviewComponent/>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button color="primary" href={imageLink} target="_blank" endIcon={<OpenInNew/>}>Open image</Button>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>)}
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon/>}>
                                        <Typography
                                            className={classes.heading}>
                                            Specifics
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            <ListItem>
                                                <ListItemText primary={mode} secondary="Mode"/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={platforms.join(', ')} secondary="Platforms"/>
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText primary={category} secondary="Category"/>
                                            </ListItem>
                                            {subcategory && (<ListItem>
                                                <ListItemText primary={subcategory} secondary="Subcategory"/>
                                            </ListItem>)}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                            {(saleMethod !== 'offersOnly' || offer) && (<Grid item xs={12}>
                                <List>
                                    <>
                                        <ListItem divider>
                                            {fixedAmount !== 'usd' && (<ListItemAvatar>
                                                <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                        src="/eos-eos-logo.svg"/>
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
                                    </>
                                </List>
                            </Grid>)}
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
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}>
                                Created on {getDatetime(createdOnTimestamp)}
                            </Grid>
                            {createdOnTimestamp !== lastUpdatedOnTimestamp && (<Grid item xs={12}>
                                <Typography>
                                    Last updated on {getDatetime(lastUpdatedOnTimestamp)}
                                </Typography>
                            </Grid>)}
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default PostComponent

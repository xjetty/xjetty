import Head from "next/head";
import React, {useEffect} from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    LinearProgress,
    MuiThemeProvider,
    Typography
} from "@material-ui/core";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import {useContext, useMemo} from "react";
import {AppContext} from "../contexts/AppContext";
import SearchFieldComponent from "../components/FieldComponents/SearchFieldComponent";
import axios from "axios";
import {red} from "@material-ui/core/colors";
import UpdateEosRate from "../components/UpdateEosRate";
import {GpsFixed, GpsNotFixed, EmojiPeople, OpenInNew} from '@material-ui/icons'
import Masonry from 'react-masonry-css'
import {Pagination} from "@material-ui/lab";
import WorldwideFieldComponent from "../components/FieldComponents/WorldwideFieldComponent";
import CountriesFieldComponent from "../components/FieldComponents/CountriesFieldComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
    },
    listingMedia: {
        height: theme.spacing(30)
    },
    chip: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    masonryGrid: {
        display: "flex",
        marginLeft: '-16px',
        width: 'auto',
        marginBottom: '-16px'
    },
    masonryGridColumn: {
        paddingLeft: '16px',
        backgroundClip: 'padding-box'
    }
}))

const breakpointColumnsObj = {
    default: 3,
    1280: 3,
    960: 2,
    600: 1
}

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

const redTheme = createTheme({palette: {primary: red}})

const Listings = () => {
    const classes = useStyles()
    const {
        search,
        eosRate,
        countries,
        worldwide,
        setCountries,
        setWorldwide,
        countriesError,
        setHideRecaptcha,
    } = useContext(AppContext)
    const [listings, setListings] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [pageLength, setPageLength] = React.useState(1)
    const [submittingData, setSubmittingData] = React.useState(false)
    const [show, setShow] = React.useState(false)

    const getListings = async (applied, search, worldwide, countries, page) => {
        try {
            const res = await axios.post('api/getListings', {
                applied: applied,
                search: search,
                worldwide: worldwide,
                countries: countries,
                page: page
            })
            const data = res.data
            if (data.success) {
                setListings(data.listings)
                setPageLength(data.pageLength)
                setShow(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert(e)
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
    }

    const submitData = () => {
        setSubmittingData(true)
        setListings([])
        getListings(true, search, worldwide, countries, page)
    }

    useEffect(() => {
        setHideRecaptcha(true)
        let worldwide2 = localStorage.getItem('worldwide')
        let countries2 = localStorage.getItem('countries')
        if (worldwide2 && countries2) {
            worldwide2 = JSON.parse(worldwide2)
            countries2 = JSON.parse(countries2)
            setWorldwide(worldwide2)
            setCountries(countries2)
            getListings(true, '', worldwide2, countries2, 1)
        } else
            getListings(true, '', worldwide, countries, 1)
    }, [])

    useEffect(() => {
        if (show) {
            localStorage.setItem('worldwide', worldwide)
            localStorage.setItem('countries', JSON.stringify(countries))
        }
    }, [worldwide, countries])

    const disabled = useMemo(() => {
        if (submittingData)
            return true
        if (!worldwide) {
            return !countries.length || countriesError
        } else
            return false
    }, [countriesError, countries, worldwide, submittingData])

    const updateAmount = (listing) => {
        let returnThis = {}
        if (listing.fixedAmount === 'usd') {
            const fixedAmount = `${usdFormatter.format(listing.usdAmount)} USD`
            const notFixedAmount = `${eosFormatter.format(listing.usdAmount / eosRate).replace('$', '')} EOS`
            returnThis = {fixedAmount: fixedAmount, notFixedAmount: notFixedAmount}
        } else {
            const fixedAmount = `${eosFormatter.format(listing.eosAmount).replace('$', '')} EOS`
            const notFixedAmount = `${usdFormatter.format(listing.eosAmount * eosRate)} USD`
            returnThis = {fixedAmount: fixedAmount, notFixedAmount: notFixedAmount}
        }
        return returnThis
    }

    const changePage = (event, value) => {
        if (page !== value) {
            setSubmittingData(true)
            setListings([])
            setPage(value)
            getListings(false, search, worldwide, countries, value)
        }
    }

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

    return (
        <html>
        <Head>
            <title>Listings - BlockCommerc</title>
            <meta name="robots" content="noindex"/>
        </Head>
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
                                <Typography variant="h5">
                                    Filter Listings
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <WorldwideFieldComponent/>
                            </Grid>
                            {!worldwide && (<Grid item xs={12}>
                                <CountriesFieldComponent/>
                            </Grid>)}
                            <Grid item xs={12}>
                                <SearchFieldComponent/>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={2}>
                            {submittingData && (<Grid item xs={12}>
                                <LinearProgress/>
                            </Grid>)}
                            <Grid item xs={12}>
                                <Button onClick={submitData} disabled={disabled} variant="contained"
                                        color="primary">Apply</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            {show && (<Grid item xs={12}>
                {listings.length > 0 ? (<Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.masonryGrid}
                    columnClassName={classes.masonryGridColumn}
                >
                    {listings.map((listing, index) => (
                        <Card variant="outlined" key={index} style={{marginBottom: '16px'}}>
                            {listing.imageLink && (<CardMedia
                                className={classes.listingMedia}
                                image={listing.imageLink}
                            />)}
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6">
                                            {listing.title}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {getDatetime(listing.createdOnTimestamp)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.chip} key={eosRate}>
                                            {listing.saleMethod !== 'offersOnly' && (<><Chip
                                                label={updateAmount(listing).fixedAmount}
                                                icon={<GpsFixed/>}/>
                                                <Chip label={updateAmount(listing).notFixedAmount}
                                                      icon={<GpsNotFixed/>}/></>)}
                                            {listing.saleMethod !== 'askingPriceOnly' && (
                                                <MuiThemeProvider theme={redTheme}><Chip label="Taking offers"
                                                                                         icon={<EmojiPeople/>}
                                                                                         color="primary"/></MuiThemeProvider>)}
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button href={`/listing/${listing.code}`} target="_blank" variant="contained"
                                        color="primary" endIcon={<OpenInNew/>}>Buy now</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Masonry>) : !submittingData ? (
                    <Card variant="outlined">
                        <CardContent>
                            <Typography>
                                No listings to show 😢
                            </Typography>
                        </CardContent>
                    </Card>
                ) : ('')}
            </Grid>)}
            {listings.length > 0 && (<Grid item xs={12} container justifyContent="center">
                <Pagination color="primary" count={pageLength} page={page} onChange={changePage}/>
            </Grid>)}
        </Grid>
        <UpdateEosRate/>
        </html>
    )
}

export default Listings
import Head from "next/head";
import React from 'react'
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
import WorldwideFieldComponent from "../components/FieldComponents/WorldwideFieldComponent";
import CountriesFieldComponent from "../components/FieldComponents/CountriesFieldComponent";
import {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../contexts/AppContext";
import SearchFieldComponent from "../components/FieldComponents/SearchFieldComponent";
import axios from "axios";
import {red} from "@material-ui/core/colors";
import UpdateEosRate from "../components/UpdateEosRate";
import {GpsFixed, GpsNotFixed, EmojiPeople} from '@material-ui/icons'
import Masonry from 'react-masonry-css'
import {Pagination} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(15),
        backgroundSize: 'contain'
    },
    listingMedia: {
        height: theme.spacing(30),
        backgroundSize: 'contain'
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

const Public = () => {
    const classes = useStyles()
    const {
        worldwide,
        search,
        countries,
        setCountries,
        setWorldwide,
        countriesError,
        recaptchaRef,
        recaptchaResponse,
        eosRate,
    } = useContext(AppContext)
    const [listings, setListings] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [applied, setApplied] = React.useState(true)
    const [pageLength, setPageLength] = React.useState(1)
    const [submittingData, setSubmittingData] = React.useState(false)

    useEffect(() => {
        const worldwide = localStorage.getItem('worldwide')
        const countries = localStorage.getItem('countries')
        if (worldwide && countries) {
            setWorldwide(JSON.parse(worldwide))
            setCountries(JSON.parse(countries))
        }
        recaptchaRef.current.execute()
    }, [])

    const getListings = async (applied, search, worldwide, countries, page) => {
        try {
            const res = await axios.post('api/getListings', {
                applied: applied,
                search: search,
                worldwide: worldwide,
                countries: countries,
                page: page,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                setListings(data.listings)
                setPageLength(data.pageLength)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    const submitRecaptcha = () => {
        setSubmittingData(true)
        setListings([])
        setApplied(true)
        recaptchaRef.current.execute()
    }

    useEffect(() => {
        if (recaptchaResponse)
            getListings(applied, search, worldwide, countries, page)
    }, [recaptchaResponse])

    useEffect(() => {
        localStorage.setItem('worldwide', worldwide)
        localStorage.setItem('countries', JSON.stringify(countries))
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
        setSubmittingData(true)
        setListings([])
        setApplied(false)
        setPage(value)
        recaptchaRef.current.execute()
    }

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
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={2}>
                            {submittingData && (<Grid item xs={12}>
                                <LinearProgress/>
                            </Grid>)}
                            <Grid item xs={12}>
                                <Button onClick={submitRecaptcha} disabled={disabled} variant="contained"
                                        color="primary">Apply</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.masonryGrid}
                    columnClassName={classes.masonryGridColumn}
                >
                    {listings.map((listing, index) => (
                        <Card key={index} style={{marginBottom: '16px'}}>
                            {listing.imageLinks[0] && (<CardMedia
                                className={classes.listingMedia}
                                image={listing.imageLinks[0]}
                            />)}
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {listing.title}
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
                                                <MuiThemeProvider theme={redTheme}><Chip label="Accepting offers"
                                                                                         icon={<EmojiPeople/>}
                                                                                         color="primary"/></MuiThemeProvider>)}
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button href={`/listing/${listing.code}`} target="_blank" variant="contained"
                                        color="primary">Go to listing</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Masonry>
            </Grid>
            {listings.length > 0 && (<Grid item xs={12} container justifyContent="center">
                <Pagination color="primary" count={pageLength} page={page} onChange={changePage}/>
            </Grid>)}
        </Grid>
        <UpdateEosRate/>
        </html>
    )
}

export default Public
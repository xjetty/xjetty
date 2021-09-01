import Head from "next/head";
import React from 'react'
import {
    Button, ButtonGroup,
    Card, CardActions,
    CardContent, CardMedia,
    Grid,
    List,
    ListItem, ListItemIcon,
    ListItemText, ListSubheader,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Link from 'next/link'
import ContactFormComponent from "../components/FormComponents/ContactFormComponent";
import SendMessageActionComponent from "../components/ActionComponents/SendMessageActionComponent";
import GoToListingComponent from "../components/GoToListingComponent";
import {CheckCircle, Copyright, EmojiEvents} from '@material-ui/icons'
import WorldwideFieldComponent from "../components/FieldComponents/WorldwideFieldComponent";
import CountriesFieldComponent from "../components/FieldComponents/CountriesFieldComponent";
import {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../contexts/AppContext";
import SearchFieldComponent from "../components/FieldComponents/SearchFieldComponent";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(15),
        backgroundSize: 'contain'
    }
}))

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
    } = useContext(AppContext)
    const [listings, setListings] = React.useState([])

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
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (recaptchaResponse)
            getListings(true, '', worldwide, countries, 1)
    }, [recaptchaResponse])

    useEffect(() => {
        localStorage.setItem('worldwide', worldwide)
        localStorage.setItem('countries', JSON.stringify(countries))
    }, [worldwide, countries])

    const disabled = useMemo(() => {
        if (!worldwide) {
            return !countries.length || countriesError
        } else
            return false
    }, [countriesError, countries, worldwide])

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
                            {/*get listings based on value in localstorage if not in localstorage assume worldwide*/}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button onClick={getListings} disabled={disabled} variant="contained"
                                color="primary">Apply</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </html>
    )
}

export default Public
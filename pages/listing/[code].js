import Head from "next/head";
import React, {useContext, useEffect} from "react";
import ListingComponent from "../../components/ListingComponent";
import {useRouter} from "next/router";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import UpdateEosRate from "../../components/UpdateEosRate";

const Listing = () => {

    const router = useRouter()
    const code = router.query.code
    const [show, setShow] = React.useState(false)

    const {
        recaptchaRef,
        recaptchaResponse,
        setCode,
        setFixedAmount,
        setUsdAmountValue,
        setEosAmountValue,
        setDescription,
        setUseEscrow,
        setSaleMethod,
        setEosAccountItems,
        setTitle,
        setImageLinks,
        setPublicListing,
        setWorldwide,
        setCountries,
    } = useContext(AppContext)

    useEffect(() => {
        recaptchaRef.current.execute()
    }, [])

    useEffect(() => {
        setCode(code)
    })

    const setEosAccountItems2 = () => {
        if (localStorage.getItem('eosAccountItems'))
            setEosAccountItems(JSON.parse(localStorage.getItem('eosAccountItems')))
    }

    const loadListingData = async () => {
        try {
            const res = await axios.post('../api/getListingData', {
                code: code,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                setEosAccountItems2()
                const listing = data.listing
                const title = listing.title
                const imageLinks = listing.imageLinks
                const description = listing.description
                const publicListing = listing.publicListing
                const worldwide = listing.worldwide
                const countries = listing.countries
                const fixedAmount = listing.fixedAmount
                const usdAmount = listing.usdAmount
                const eosAmount = listing.eosAmount
                const useEscrow = listing.useEscrow
                const saleMethod = listing.saleMethod
                setTitle(title)
                setImageLinks(imageLinks)
                setPublicListing(publicListing)
                setWorldwide(worldwide)
                setCountries(countries)
                setFixedAmount(fixedAmount)
                setUsdAmountValue(usdAmount)
                setEosAmountValue(eosAmount)
                setDescription(description)
                setUseEscrow(useEscrow)
                setSaleMethod(saleMethod)
                setShow(true)
                process.nextTick(() => {
                    recaptchaRef.current.reset()
                })
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
    }

    useEffect(() => {
        if (recaptchaResponse && !show)
            loadListingData()
    }, [recaptchaResponse])

    return (
        <>
            <Head>
                <title>Listing - BlockCommerc</title>
            </Head>
            <UpdateEosRate/>
            {show && <ListingComponent/>}
        </>
    )
}

export default Listing
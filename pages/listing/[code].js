import Head from "next/head";
import React, {useContext, useEffect} from "react";
import ListingComponent from "../../components/ListingComponent";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import UpdateEosRate from "../../components/UpdateEosRate";

const Listing = ({code}) => {

    const [show, setShow] = React.useState(false)

    const {
        setFixedAmount,
        setUsdAmountValue,
        setEosAmountValue,
        setDescription,
        setSaleMethod,
        setEosAccountItems,
        setTitle,
        setImageLinks,
        setMinAmount,
        setCreatedOnTimestamp,
        setLastUpdatedOnTimestamp,
        setHideRecaptcha,
        setEosAccount,
        setPublicListing,
        setWorldwide,
        setCountries,
        setUseEscrow,
        setCondition,
    } = useContext(AppContext)

    useEffect(() => {
        setHideRecaptcha(true)
        getListingData()
    }, [])

    const setEosAccountItems2 = () => {
        const eosAccountItems = localStorage.getItem('eosAccountItems')
        const eosAccountToken = localStorage.getItem('eosAccountToken')
        if (eosAccountItems)
            setEosAccountItems(JSON.parse(localStorage.getItem('eosAccountItems')))
        if (eosAccountToken)
            setEosAccount(JSON.parse(localStorage.getItem('eosAccountToken')))
    }

    const getListingData = async () => {
        try {
            const res = await axios.post('../api/getListingData', {
                code: code
            })
            const data = res.data
            if (data.success) {
                setEosAccountItems2()
                const listing = data.listing
                const publicListing = listing.publicListing
                const worldwide = listing.worldwide
                const countries = listing.countries
                const condition = listing.condition
                const title = listing.title
                const imageLinks = listing.imageLinks
                const description = listing.description
                const fixedAmount = listing.fixedAmount
                const usdAmount = listing.usdAmount
                const eosAmount = listing.eosAmount
                const saleMethod = listing.saleMethod
                const useEscrow = listing.useEscrow
                if (saleMethod === 'askingPriceOnly') {
                    setHideRecaptcha(true)
                } else
                    setHideRecaptcha(false)
                const createdOnTimestamp = listing.createdOnTimestamp
                const lastUpdatedOnTimestamp = listing.lastUpdatedOnTimestamp
                setPublicListing(publicListing)
                setWorldwide(worldwide)
                setCountries(countries)
                setCondition(condition)
                setTitle(title)
                setImageLinks(imageLinks)
                setFixedAmount(fixedAmount)
                setUsdAmountValue(usdAmount)
                setEosAmountValue(eosAmount)
                setDescription(description)
                setSaleMethod(saleMethod)
                setUseEscrow(useEscrow)
                setCreatedOnTimestamp(createdOnTimestamp)
                setLastUpdatedOnTimestamp(lastUpdatedOnTimestamp)
                setMinAmount(false)
                setShow(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            console.log(e)
            alert('Lost Internet connection')
        }
    }

    return (
        <html>
            <Head>
                <title>Listing - BlockCommerc</title>
                <meta name="robots" content="noindex"/>
            </Head>
            <UpdateEosRate/>
            {show && <ListingComponent code={code}/>}
        </html>
    )
}

export async function getServerSideProps({params}) {
    const code = params.code
    return {
        props: {code}
    }
}

export default Listing
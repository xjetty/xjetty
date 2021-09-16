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
    } = useContext(AppContext)

    useEffect(() => {
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
                const post = data.post
                const publicListing = post.publicListing
                const worldwide = post.worldwide
                const countries = post.countries
                const title = post.title
                const imageLinks = post.imageLinks
                const description = post.description
                const fixedAmount = post.fixedAmount
                const usdAmount = post.usdAmount
                const eosAmount = post.eosAmount
                const saleMethod = post.saleMethod
                if (saleMethod === 'askingPriceOnly')
                    setHideRecaptcha(true)
                const createdOnTimestamp = post.createdOnTimestamp
                const lastUpdatedOnTimestamp = post.lastUpdatedOnTimestamp
                setPublicListing(publicListing)
                setWorldwide(worldwide)
                setCountries(countries)
                setTitle(title)
                setImageLinks(imageLinks)
                setFixedAmount(fixedAmount)
                setUsdAmountValue(usdAmount)
                setEosAmountValue(eosAmount)
                setDescription(description)
                setSaleMethod(saleMethod)
                setCreatedOnTimestamp(createdOnTimestamp)
                setLastUpdatedOnTimestamp(lastUpdatedOnTimestamp)
                setMinAmount(false)
                setShow(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
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
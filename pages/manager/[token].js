import Head from "next/head";
import ManagerComponent from "../../components/ManagerComponent";
import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import UpdateEosRate from "../../components/UpdateEosRate";

const Manager = ({token}) => {
    const {
        setDescription,
        setQuantity,
        setSaleMethod,
        setFixedAmount,
        setUsdAmount,
        setEosAmount,
        setMaximumPercentLessThan,
        setEosAccountName,
        setAddMemo,
        setMemo,
        setLink,
        setHidden,
        setMinimumQuantity,
        setOffers,
        setShowOffers,
        setLinkCode,
        setDefaultQuantity,
        setTitle,
        setImageLinks,
        setKeywords,
        setHideRecaptcha,
        setPublicListing,
        setWorldwide,
        setCountries,
        setCondition,
    } = useContext(AppContext)

    const [show, setShow] = React.useState(false)

    const getManagerData = async (token) => {
        try {
            const res = await axios.post('../api/getManagerData', {
                token: token
            })
            const data = res.data
            if (data.success) {
                const listing = data.listing
                const offers = data.offers
                setOffers(offers)
                setPublicListing(listing.publicListing)
                setWorldwide(listing.worldwide)
                setCountries(listing.countries)
                setCondition(listing.condition)
                setTitle(listing.title)
                setImageLinks(listing.imageLinks)
                setKeywords(listing.keywords)
                setDescription(listing.description)
                setQuantity(listing.quantity)
                setDefaultQuantity(listing.quantity)
                setSaleMethod(listing.saleMethod)
                setFixedAmount(listing.fixedAmount)
                if (listing.fixedAmount === 'usd') {
                    setUsdAmount(listing.usdAmount)
                } else setEosAmount(listing.eosAmount)
                setMaximumPercentLessThan(listing.maximumPercentLessThan)
                if (listing.saleMethod !== 'askingPriceOnly')
                    setShowOffers(true)
                setEosAccountName(listing.eosAccountName)
                setAddMemo(listing.addMemo)
                setMemo(listing.memo)
                setLink(listing.link)
                setHidden(listing.hidden)
                setMinimumQuantity(listing.minimumQuantity)
                setLinkCode(listing.code)
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

    useEffect(() => {
        setHideRecaptcha(true)
        getManagerData(token)
    }, [])

    return (
        <html>
            <Head>
                <title>Manager - BlockCommerc</title>
                <meta name="robots" content="noindex"/>
            </Head>
            <UpdateEosRate/>
            {show && <ManagerComponent token={token}/>}
        </html>
    )
}

export async function getServerSideProps({params}) {
    const token = params.token
    return {
        props: {token}
    }
}

export default Manager
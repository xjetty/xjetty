import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import Head from "next/head";
import ListingComponent from "../../components/ListingComponent";
import UpdateEosRate from "../../components/UpdateEosRate";

const Offer = ({token}) => {

    const {
        setFixedAmount,
        setUsdAmountValue,
        setEosAmountValue,
        setDescription,
        setSaleMethod,
        setEosAccountItems,
        setTitle,
        setImageLinks,
        setEmailAddress,
        setOffer,
        setHideRecaptcha,
        setLink,
        setPublicListing,
        setWorldwide,
        setCountries,
        setUseEscrow,
        setCondition,
        setQuantityOptions,
    } = useContext(AppContext)

    const [show, setShow] = React.useState(false)

    useEffect(() => {
        setOffer(true)
    })

    const setEosAccountItems2 = () => {
        if (localStorage.getItem('eosAccountItems'))
            setEosAccountItems(JSON.parse(localStorage.getItem('eosAccountItems')))
    }

    const getOfferData = async () => {
        try {
            const res = await axios.post('../api/getOfferData', {
                token: token
            })
            const data = res.data
            if (data.success) {
                setEosAccountItems2()
                const listing = data.listing
                const condition = data.condition
                const title = listing.title
                const imageLinks = listing.imageLinks
                const description = listing.description
                const fixedAmount = listing.fixedAmount
                const usdAmount = listing.usdAmount
                const eosAmount = listing.eosAmount
                const emailAddress = listing.emailAddress
                const saleMethod = listing.saleMethod
                const useEscrow = listing.useEscrow
                const link = listing.link
                const publicListing = listing.publicListing
                const worldwide = listing.worldwide
                const countries = listing.countries
                const quantityAvailable = listing.quantityAvailable
                let setQuantityOptions2 = Array.from({length: quantityAvailable}, (_, i) => i + 1)
                setQuantityOptions2 = setQuantityOptions2.map(function (value) {
                    return value.toString()
                })
                setQuantityOptions(setQuantityOptions2)
                setCondition(condition)
                setTitle(title)
                setImageLinks(imageLinks)
                setFixedAmount(fixedAmount)
                setUsdAmountValue(usdAmount)
                setEosAmountValue(eosAmount)
                setDescription(description)
                setSaleMethod(saleMethod)
                setUseEscrow(useEscrow)
                setEmailAddress(emailAddress)
                setLink(link)
                setPublicListing(publicListing)
                setWorldwide(worldwide)
                setCountries(countries)
                setShow(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
    }

    useEffect(() => {
        setHideRecaptcha(true)
        getOfferData()
    }, [])

    return (
        <>
        <Head>
            <title>Offer - BlockCommerc</title>
            <meta name="robots" content="noindex"/>
        </Head>
            <UpdateEosRate/>
        {show && <ListingComponent token={token}/>}
        </>
    )

}

export async function getServerSideProps({params}) {
    const token = params.token
    return {
        props: {token}
    }
}

export default Offer
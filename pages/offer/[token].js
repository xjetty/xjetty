import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import Head from "next/head";
import ListingComponent from "../../components/ListingComponent";

const Offer = () => {

    const router = useRouter()
    const token = router.query.token

    const {
        recaptchaRef,
        recaptchaResponse,
        setToken,
        setEosRate,
        setFixedAmount,
        setUsdAmountValue,
        setEosAmountValue,
        setNotes,
        setUseEscrow,
        setSaleMethod,
        setOffer,
        setEmailAddress
    } = useContext(AppContext)

    const [show, setShow] = React.useState(false)

    useEffect(() => {
        recaptchaRef.current.execute()
    }, [])

    useEffect(() => {
        setToken(token)
        setOffer(true)
    })

    const updateEosRate = async () => {
        const res = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price?ids=eos&vs_currencies=usd'
        )
        setEosRate(res.data['eos']['usd'])
    }

    const getOfferData = async () => {
        try {
            const res = await axios.post('../api/getOfferData', {
                token: token,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                await updateEosRate()
                setInterval(async () => {
                    updateEosRate()
                }, 60000)
                const listing = data.listing
                const fixedAmount = listing.fixedAmount
                const usdAmount = listing.usdAmount
                const eosAmount = listing.eosAmount
                const notes = listing.notes
                const useEscrow = listing.useEscrow
                const saleMethod = listing.saleMethod
                const emailAddress = listing.emailAddress
                setEmailAddress(emailAddress)
                setFixedAmount(fixedAmount)
                setUsdAmountValue(usdAmount)
                setEosAmountValue(eosAmount)
                setNotes(notes)
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
            getOfferData()
    }, [recaptchaResponse])

    return (
        <>
        <Head>
            <title>Offer - BlockCommerc</title>
        </Head>
        {show && <ListingComponent/>}
        </>
    )

}

export default Offer
import Head from "next/head";
import ManagerComponent from "../../components/ManagerComponent";
import {useRouter} from "next/router";
import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import UpdateEosRate from "../../components/UpdateEosRate";

const Manager = () => {

    const router = useRouter()
    const token = router.query.token

    const {
        recaptchaRef,
        recaptchaResponse,
        setNotes,
        setQuantity,
        setSaleMethod,
        setFixedAmount,
        setUsdAmount,
        setEosAmount,
        setMaximumPercentLessThan,
        setUseEscrow,
        setEosAccountName,
        setAddMemo,
        setMemo,
        setLink,
        setToken,
        setHidden,
        setMinimumQuantity,
        setOffers,
        setShowOffers,
        setLinkCode,
        setDefaultQuantity
    } = useContext(AppContext)

    const [show, setShow] = React.useState(false)

    useEffect(() => {
        setToken(token)
    }, [setToken])

    useEffect(() => {
        recaptchaRef.current.execute()
    }, [])

    const getManagerData = async () => {
        try {
            const res = await axios.post('../api/getManagerData', {
                token: token,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                const listing = data.listing
                const offers = data.offers
                setOffers(offers)
                setNotes(listing.notes)
                setQuantity(listing.quantity)
                setDefaultQuantity(listing.quantity)
                setSaleMethod(listing.saleMethod)
                setFixedAmount(listing.fixedAmount)
                if (listing.fixedAmount === 'usd') {
                    setUsdAmount(listing.usdAmount)
                } else setEosAmount(listing.eosAmount)
                if (listing.saleMethod === 'askingPriceAndOffers')
                    setMaximumPercentLessThan(listing.maximumPercentLessThan)
                if (listing.saleMethod !== 'askingPriceOnly')
                    setShowOffers(true)
                setUseEscrow(listing.useEscrow)
                setEosAccountName(listing.eosAccountName)
                setAddMemo(listing.addMemo)
                if (listing.addMemo) setMemo(listing.memo)
                setLink(listing.link)
                setHidden(listing.hidden)
                setMinimumQuantity(listing.minimumQuantity)
                setLinkCode(listing.code)
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
            getManagerData()
    }, [recaptchaResponse])

    return (
        <>
            <Head>
                <title>Manager - BlockCommerc</title>
            </Head>
            <UpdateEosRate/>
            {show && <ManagerComponent/>}
        </>
    )
}

export default Manager
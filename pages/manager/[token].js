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
        setImageLink,
        setKeywords,
        setMode,
        setPlatforms,
        setCategory,
        setSubcategory,
        setHideRecaptcha,
    } = useContext(AppContext)

    const [show, setShow] = React.useState(false)

    const getManagerData = async (token) => {
        try {
            const res = await axios.post('../api/getManagerData', {
                token: token
            })
            const data = res.data
            if (data.success) {
                const post = data.post
                const offers = data.offers
                setOffers(offers)
                setMode(post.mode)
                setPlatforms(post.platforms)
                setCategory(post.category)
                setSubcategory(post.subcategory)
                setTitle(post.title)
                setImageLink(post.imageLink)
                setKeywords(post.keywords)
                setDescription(post.description)
                setQuantity(post.quantity)
                setDefaultQuantity(post.quantity)
                setSaleMethod(post.saleMethod)
                setFixedAmount(post.fixedAmount)
                if (post.fixedAmount === 'usd') {
                    setUsdAmount(post.usdAmount)
                } else setEosAmount(post.eosAmount)
                setMaximumPercentLessThan(post.maximumPercentLessThan)
                if (post.saleMethod !== 'askingPriceOnly')
                    setShowOffers(true)
                setEosAccountName(post.eosAccountName)
                setAddMemo(post.addMemo)
                setMemo(post.memo)
                setLink(post.link)
                setHidden(post.hidden)
                setMinimumQuantity(post.minimumQuantity)
                setLinkCode(post.code)
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
                <title>Manager - D2R Crypto</title>
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
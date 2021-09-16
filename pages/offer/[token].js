import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import Head from "next/head";
import PostComponent from "../../components/PostComponent";
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
        setImageLink,
        setMode,
        setPlatforms,
        setCategory,
        setSubcategory,
        setEmailAddress,
        setOffer,
        setHideRecaptcha,
        setLink,
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
                const post = data.post
                const mode = post.mode
                const platforms = post.platforms
                const category = post.category
                const subcategory = post.subcategory
                const title = post.title
                const imageLink = post.imageLink
                const description = post.description
                const fixedAmount = post.fixedAmount
                const usdAmount = post.usdAmount
                const eosAmount = post.eosAmount
                const emailAddress = post.emailAddress
                const saleMethod = post.saleMethod
                const link = post.link
                setMode(mode)
                setPlatforms(platforms)
                setCategory(category)
                setSubcategory(subcategory)
                setTitle(title)
                setImageLink(imageLink)
                setFixedAmount(fixedAmount)
                setUsdAmountValue(usdAmount)
                setEosAmountValue(eosAmount)
                setDescription(description)
                setSaleMethod(saleMethod)
                setEmailAddress(emailAddress)
                setLink(link)
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
            <title>Offer - D2R Crypto</title>
            <meta name="robots" content="noindex"/>
        </Head>
            <UpdateEosRate/>
        {show && <PostComponent token={token}/>}
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
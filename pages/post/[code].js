import Head from "next/head";
import React, {useContext, useEffect} from "react";
import PostComponent from "../../components/PostComponent";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import UpdateEosRate from "../../components/UpdateEosRate";

const Post = ({code}) => {

    const [show, setShow] = React.useState(false)

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
        setMinAmount,
        setCreatedOnTimestamp,
        setLastUpdatedOnTimestamp,
        setHideRecaptcha,
        setEosAccount,
    } = useContext(AppContext)

    useEffect(() => {
        getPostData()
    }, [])

    const setEosAccountItems2 = () => {
        const eosAccountItems = localStorage.getItem('eosAccountItems')
        const eosAccountToken = localStorage.getItem('eosAccountToken')
        if (eosAccountItems)
            setEosAccountItems(JSON.parse(localStorage.getItem('eosAccountItems')))
        if (eosAccountToken)
            setEosAccount(JSON.parse(localStorage.getItem('eosAccountToken')))
    }

    const getPostData = async () => {
        try {
            const res = await axios.post('../api/getPostData', {
                code: code
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
                const saleMethod = post.saleMethod
                if (saleMethod === 'askingPriceOnly')
                    setHideRecaptcha(true)
                const createdOnTimestamp = post.createdOnTimestamp
                const lastUpdatedOnTimestamp = post.lastUpdatedOnTimestamp
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
                <title>Post - D2R Crypto</title>
            </Head>
            <UpdateEosRate/>
            {show && <PostComponent code={code}/>}
        </html>
    )
}

export async function getServerSideProps({params}) {
    const code = params.code
    return {
        props: {code}
    }
}

export default Post
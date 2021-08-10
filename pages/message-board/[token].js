import Head from "next/head";
import React, {useContext, useEffect} from "react";
import MessageComponent from "../../components/MessageComponent";
import {Grid} from "@material-ui/core";
import {useRouter} from "next/router";
import PostMessageFormComponent from "../../components/FormComponents/PostMessageFormComponent";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import ListingDetailsComponent from "../../components/ListingDetailsComponent";
import EscrowComponent from "../../components/EscrowComponent";

const MessageBoard = () => {

    const router = useRouter()
    const token = router.query.token

    const {recaptchaRef, recaptchaResponse, messages, setMessages, setEscrowDetails} = useContext(AppContext)

    const [show, setShow] = React.useState(false)
    const [escrow, setEscrow] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [listingDetails, setListingDetails] = React.useState({})

    useEffect(() => {
        recaptchaRef.current.execute()
    }, [])

    const getMessageBoardData = async () => {
        try {
            const res = await axios.post('../api/getMessageBoardData', {
                token: token,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                console.log(data)
                const user = data.user
                const messages = data.messages
                const listingDetails = data.listingDetails
                const escrowDetails = data.escrowDetails
                const escrow = listingDetails.useEscrow
                setMessages(messages.reverse())
                setListingDetails(listingDetails)
                setEscrowDetails(escrowDetails)
                setEscrow(escrow)
                setUser(user)
                setShow(true)
                process.nextTick(() => {
                    recaptchaRef.current.reset()
                })
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert(e)
            console.log(e)
        }
    }

    const datetimeOptions = {
        day: 'numeric',
        month: 'long',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    }

    const getDatetime = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', datetimeOptions)
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        if (recaptchaResponse && !show)
            getMessageBoardData()
    }, [recaptchaResponse])

    return (
        <>
        <Head>
            <title>Message Board - BlockCommerc</title>
        </Head>
        {show && (<Grid container spacing={2}>
            {escrow ? (<Grid item xs={12}>
                <EscrowComponent token={token} user={user}/>
            </Grid>) : ('')}
            <Grid item xs={12}>
                <PostMessageFormComponent token={token}/>
            </Grid>
            <Grid item xs={12}>
                <ListingDetailsComponent listingDetails={listingDetails}/>
            </Grid>
            {messages.map((message, index) => (
                <Grid item xs={12} key={index}>
                    <MessageComponent user={message.user === user ? 'You' : capitalizeFirstLetter(message.user)}
                                      message={message.message}
                                      datetime={getDatetime(message.timestamp)}/>
                </Grid>
            ))}
        </Grid>)}
        </>
    )
}

export default MessageBoard
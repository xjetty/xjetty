import Head from "next/head";
import React, {useContext, useEffect} from "react";
import MessageComponent from "../../components/MessageComponent";
import {Grid} from "@material-ui/core";
import PostMessageFormComponent from "../../components/FormComponents/PostMessageFormComponent";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import PostDetailsComponent from "../../components/PostDetailsComponent";
import EscrowComponent from "../../components/EscrowComponent";

const MessageBoard = ({token}) => {

    const {messages, setMessages, setEscrowDetails} = useContext(AppContext)
    const [show, setShow] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [postDetails, setPostDetails] = React.useState({})
    const [createdOnTimestamp, setCreatedOnTimestamp] = React.useState('')

    const getMessageBoardData = async () => {
        try {
            const res = await axios.post('../api/getMessageBoardData', {
                token: token
            })
            const data = res.data
            if (data.success) {
                const messageBoardData = data.messageBoardData
                const user = messageBoardData.user
                const messages = messageBoardData.messages
                const postDetails = messageBoardData.postDetails
                const escrowDetails = messageBoardData.escrowDetails
                const createdOnTimestamp = messages[0]['timestamp']
                setCreatedOnTimestamp(createdOnTimestamp)
                setMessages(messages.reverse())
                setPostDetails(postDetails)
                setEscrowDetails(escrowDetails)
                setUser(user)
                setShow(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
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
        getMessageBoardData()
    }, [])

    return (
        <html>
            <Head>
                <title>Message Board - BlockCommerc</title>
            </Head>
            {show && (<Grid container spacing={2}>
                <Grid item xs={12}>
                    <PostDetailsComponent createdOnDatetime={getDatetime(createdOnTimestamp)}
                                          postDetails={postDetails}/>
                    <EscrowComponent token={token} user={user}/>
                </Grid>
                <Grid item xs={12}>
                    <PostMessageFormComponent
                        subtitle={`Communicate With Your ${user === 'seller' ? 'Buyer' : 'Seller'}`} token={token}/>
                </Grid>
                {messages.map((message, index) => (
                    <Grid item xs={12} key={index}>
                        <MessageComponent user={message.user === user ? 'You' : capitalizeFirstLetter(message.user)}
                                          message={message.message}
                                          datetime={getDatetime(message.timestamp)}/>
                    </Grid>
                ))}
            </Grid>)}
        </html>
    )
}

export async function getServerSideProps({params}) {
    const token = params.token
    return {
        props: {token}
    }
}

export default MessageBoard
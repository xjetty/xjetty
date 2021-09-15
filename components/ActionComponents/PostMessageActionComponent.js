import {Button, Grid, LinearProgress} from "@material-ui/core";
import React, {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";

const PostMessageActionComponent = (props) => {
    const [submittingData, setSubmittingData] = React.useState(false)
    const {
        recaptchaRef,
        recaptchaResponse,
        messageError,
        message,
        setSnackbarOpen,
        setSnackbarMessage,
        messages,
        setMessages,
        setMessageError,
        setMessage
    } = useContext(AppContext)

    const submitRecaptcha = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const disabled = useMemo(() => {
        return messageError || message === '' || submittingData
    }, [messageError, message, submittingData])

    const postMessage = async () => {
        try {
            const res = await axios.post('../api/postMessage', {
                token: props.token,
                recaptchaResponse: recaptchaResponse,
                message: message
            })
            const data = res.data
            if (data.success) {
                const message = data.message
                const messages2 = messages
                messages2.unshift(message)
                setMessages(messages2)
                setMessage('')
                setMessageError(false)
                setSnackbarMessage('Message posted successfully')
                setSnackbarOpen(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (error) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (recaptchaResponse && submittingData)
            postMessage()
    }, [recaptchaResponse])

    return (
        <>
            <Grid container spacing={2}>
                {submittingData && (
                    <Grid item xs={12}>
                        <LinearProgress color="secondary"/>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        key={disabled}
                        onClick={submitRecaptcha}
                        disabled={disabled}
                        variant="contained"
                        color="secondary">
                        Post message
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default PostMessageActionComponent
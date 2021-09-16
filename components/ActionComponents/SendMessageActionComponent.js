import {Button, Grid, LinearProgress} from "@material-ui/core";
import React, {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";

const SendMessageActionComponent = () => {

    const {
        emailAddress,
        emailAddressError,
        setEmailAddress,
        setEmailAddressError,
        setMessageError,
        message,
        setMessage,
        messageError,
        recaptchaRef,
        recaptchaResponse,
        setSnackbarMessage,
        setSnackbarOpen
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)

    const disabled = useMemo(() => {
        return submittingData || !emailAddress || !message || emailAddressError || messageError
    }, [submittingData, emailAddress, emailAddressError, message, messageError])

    const submitRecaptcha = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const sendMessage = async () => {
        try {
            const res = await axios.post('api/sendMessage', {
                emailAddress: emailAddress,
                message: message,
                recaptchaResponse: recaptchaResponse
            })
            if (res.data.success) {
                setEmailAddress('')
                setMessage('')
                setEmailAddressError(false)
                setMessageError(false)
                setSnackbarMessage('Message sent successfully')
                setSnackbarOpen(true)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (submittingData && recaptchaResponse)
            sendMessage()
    }, [recaptchaResponse])

    return (
        <Grid container spacing={2}>
            {submittingData && (<Grid item xs={12}>
                <LinearProgress/>
            </Grid>)}
            <Grid item xs={12}>
                <Button onClick={submitRecaptcha} disabled={disabled} variant="contained" color="primary" key={disabled}>Send message</Button>
            </Grid>
        </Grid>
    )
}

export default SendMessageActionComponent
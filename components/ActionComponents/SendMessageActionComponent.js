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
        setSnackbarOpen,
        showSomethingWentWrongDialog,
        showLostInternetConnectionDialog
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)

    const disabled = useMemo(() => {
        return submittingData || !emailAddress || !message || emailAddressError || messageError
    }, [submittingData, emailAddress, emailAddressError, message, messageError])

    const submitRecaptcha = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    useEffect(() => {
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
                    setSubmittingData(false)
                    process.nextTick(() => {
                        recaptchaRef.current.reset()
                    })
                    setSnackbarMessage('Message sent successfully')
                    setSnackbarOpen(true)
                } else {
                    setSubmittingData(false)
                    process.nextTick(() => {
                        recaptchaRef.current.reset()
                    })
                    showSomethingWentWrongDialog()
                }
            } catch (e) {
                setSubmittingData(false)
                process.nextTick(() => {
                    recaptchaRef.current.reset()
                })
                showLostInternetConnectionDialog()
            }
        }

        if (submittingData && recaptchaResponse) {
            sendMessage()
        }
    }, [recaptchaResponse])

    return (
        <Grid container spacing={2}>
            {submittingData && (<Grid item xs={12}>
                <LinearProgress/>
            </Grid>)}
            <Grid item xs={12}>
                <Button onClick={submitRecaptcha} disabled={disabled} variant="contained"
                        color="primary">Send message</Button>
            </Grid>
        </Grid>
    )
}

export default SendMessageActionComponent
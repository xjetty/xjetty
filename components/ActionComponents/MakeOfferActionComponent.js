import {Button, Grid, LinearProgress} from "@material-ui/core";
import React, {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";

const MakeOfferActionComponent = () => {

    const {
        recaptchaRef,
        usdAmountError,
        eosAmountError,
        emailAddressError,
        usdAmount,
        eosAmount,
        emailAddress,
        code,
        recaptchaResponse,
        pageTimestamp,
        setUsdAmount,
        setEosAmount,
        setEmailAddress,
        setUsdAmountError,
        setEosAmountError,
        setEmailAddressError,
        setSnackbarOpen,
        setSnackbarMessage
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)

    const submitRecaptcha = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const submitOffer = async () => {
        try {
            const res = await axios.post('../api/submitOffer', {
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                emailAddress: emailAddress,
                recaptchaResponse: recaptchaResponse,
                pageTimestamp: pageTimestamp,
                code: code
            })
            const data = res.data
            if (data.success) {
                setUsdAmount('')
                setEosAmount('')
                setEmailAddress('')
                setUsdAmountError(false)
                setEosAmountError(false)
                setEmailAddressError(false)
                setSnackbarMessage('Offer submitted successfully')
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
        if (submittingData && recaptchaResponse)
            submitOffer()
    }, [recaptchaResponse])

    const disabled = useMemo(() => {
        return (
            usdAmountError ||
            eosAmountError ||
            emailAddressError ||
            !usdAmount ||
            !eosAmount ||
            !emailAddress ||
            submittingData
        )
    }, [usdAmountError, eosAmountError, emailAddressError, usdAmount, eosAmount, emailAddress, submittingData])

    return (
        <>
            <Grid container spacing={2}>
                {submittingData && (
                    <Grid item xs={12}>
                        <LinearProgress/>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Button
                        onClick={submitRecaptcha}
                        disabled={disabled}
                        variant="contained"
                        color="primary">
                        Submit offer
                    </Button>
                </Grid>
            </Grid>
        </>
    )

}

export default MakeOfferActionComponent
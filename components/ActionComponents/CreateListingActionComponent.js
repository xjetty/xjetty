import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {Alert} from "@material-ui/lab";

const CreateListingActionComponent = () => {
    const {
        notesError,
        usdAmountError,
        eosAmountError,
        eosAccountNameError,
        memoError,
        emailAddressError,
        addMemo,
        notes,
        usdAmount,
        eosAmount,
        eosAccountName,
        memo,
        emailAddress,
        quantity,
        saleMethod,
        fixedAmount,
        maximumPercentLessThan,
        useEscrow,
        setNotes,
        sliderKey,
        setSliderKey,
        setUsdAmount,
        setEosAmount,
        setNotesError,
        setUsdAmountError,
        setEosAmountError,
        setEosAccountNameError,
        setMemoError,
        setEmailAddressError,
        recaptchaResponse,
        recaptchaRef
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)
    const [listingCreated, setListingCreated] = React.useState(false)

    const disabled = useMemo(() => {
        if (submittingData) return true
        if (addMemo) {
            return (
                notesError ||
                usdAmountError ||
                eosAmountError ||
                eosAccountNameError ||
                memoError ||
                emailAddressError ||
                !notes ||
                !usdAmount ||
                !eosAmount ||
                !eosAccountName ||
                !memo ||
                !emailAddress
            )
        } else
            return (
                notesError ||
                usdAmountError ||
                eosAmountError ||
                eosAccountNameError ||
                emailAddressError ||
                !notes ||
                !usdAmount ||
                !eosAmount ||
                !eosAccountName ||
                !emailAddress
            )
    }, [
        notesError,
        usdAmountError,
        eosAmountError,
        eosAccountNameError,
        memoError,
        emailAddressError,
        addMemo,
        submittingData,
        notes,
        usdAmount,
        eosAmount,
        eosAccountName,
        memo,
        emailAddress
    ])

    const createListing = async () => {
        try {
            const res = await axios.post('api/createListing', {
                notes: notes,
                quantity: quantity,
                saleMethod: saleMethod,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                maximumPercentLessThan: maximumPercentLessThan,
                useEscrow: useEscrow,
                eosAccountName: eosAccountName,
                addMemo: addMemo,
                memo: memo,
                emailAddress: emailAddress,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                setNotes('')
                const newSliderKey = sliderKey + 1
                setSliderKey(newSliderKey)
                setUsdAmount('')
                setEosAmount('')
                setNotesError(false)
                setUsdAmountError(false)
                setEosAmountError(false)
                setEosAccountNameError(false)
                setMemoError(false)
                setEmailAddressError(false)
                setListingCreated(true)
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
        if (submittingData && recaptchaResponse) createListing()
    }, [recaptchaResponse])

    const handle = () => {
        setListingCreated(false)
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    return (
        <Grid container spacing={2}>
            {submittingData && (
                <Grid item xs={12}>
                    <LinearProgress/>
                </Grid>
            )}
            {listingCreated && (
                <Grid item xs={12}>
                    <Alert severity="success">
                        Success! You created a listing! A link to your manager can be found in your email.
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <Button
                    key={disabled}
                    onClick={handle}
                    disabled={disabled}
                    variant="contained"
                    color="primary">
                    Create listing
                </Button>
            </Grid>
        </Grid>
    )
}

export default CreateListingActionComponent

import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'

const UpdateListingActionComponent = () => {
    const {
        notesError,
        usdAmountError,
        eosAmountError,
        eosAccountNameError,
        memoError,
        addMemo,
        notes,
        usdAmount,
        eosAmount,
        eosAccountName,
        memo,
        quantity,
        saleMethod,
        fixedAmount,
        maximumPercentLessThan,
        useEscrow,
        recaptchaResponse,
        recaptchaRef,
        token,
        setSnackbarOpen,
        setSnackbarMessage,
        setShowOffers,
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] =
        React.useState(false)

    const buttonDisabled = useMemo(() => {
        if (submittingData) return true
        if (addMemo) {
            return (
                notesError ||
                usdAmountError ||
                eosAmountError ||
                eosAccountNameError ||
                memoError ||
                !notes ||
                !usdAmount ||
                !eosAmount ||
                !eosAccountName ||
                !memo
            )
        } else
            return (
                notesError ||
                usdAmountError ||
                eosAmountError ||
                eosAccountNameError ||
                !notes ||
                !usdAmount ||
                !eosAmount ||
                !eosAccountName
            )
    }, [
        notesError,
        usdAmountError,
        eosAmountError,
        eosAccountNameError,
        memoError,
        addMemo,
        submittingData,
        notes,
        usdAmount,
        eosAmount,
        eosAccountName,
        memo
    ])

    useEffect(() => {
        const updateListing = async () => {
            try {
                const res = await axios.post('../api/updateListing', {
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
                    recaptchaResponse: recaptchaResponse,
                    token: token
                })
                const data = res.data
                if (data.success) {
                    if (saleMethod !== 'askingPriceOnly') {
                        setShowOffers(true)
                    } else
                        setShowOffers(false)
                    setSnackbarMessage('Listing updated successfully')
                    setSnackbarOpen(true)
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
        if (submittingData && recaptchaResponse)
            updateListing()
    }, [recaptchaResponse])

    const submitCaptcha = () => {
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
            <Grid item xs={12}>
                <Button
                    onClick={submitCaptcha}
                    disabled={buttonDisabled}
                    variant="contained"
                    color="primary">
                    Update listing
                </Button>
            </Grid>
        </Grid>
    )
}

export default UpdateListingActionComponent

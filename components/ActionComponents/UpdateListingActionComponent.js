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
        countries,
        worldwide,
        title,
        titleError,
        description,
        descriptionError,
        publicListing,
        countriesError,
        imageLinks,
        keywords,
        setTitle,
        setTitleError,
        setDescription,
        setDescriptionError,
        setImageLinks,
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] =
        React.useState(false)

    const disabled = useMemo(() => {
        if (submittingData) return true
        if (!title || titleError)
            return true
        if (!description || descriptionError)
            return true
        if (publicListing && !worldwide) {
            if (!countries.length || countriesError)
                return true
        }
        if (fixedAmount === 'usd') {
            if (!usdAmount || usdAmountError)
                return true
        }
        if (fixedAmount === 'eos') {
            if (!eosAmount || eosAmountError)
                return true
        }
        if (!eosAccountName || eosAccountNameError)
            return true
        if (addMemo) {
            if (!addMemo || memoError)
                return true
        }
        return false
    }, [
        submittingData,
        title,
        titleError,
        description,
        descriptionError,
        publicListing,
        worldwide,
        countries,
        countriesError,
        fixedAmount,
        usdAmount,
        usdAmountError,
        eosAmount,
        eosAmountError,
        eosAccountName,
        eosAccountNameError,
        addMemo,
        memoError
    ])

    const updateListing = async () => {
        try {
            const res = await axios.post('../api/updateListing', {
                title: title,
                imageLinks: imageLinks,
                description: description,
                publicListing: publicListing,
                keywords: keywords,
                worldwide: worldwide,
                countries: countries,
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

    useEffect(() => {
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

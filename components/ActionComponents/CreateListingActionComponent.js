import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {Alert} from "@material-ui/lab";

const CreateListingActionComponent = () => {
    const {
        usdAmountError,
        eosAmountError,
        eosAccountNameError,
        memoError,
        emailAddressError,
        addMemo,
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
        recaptchaRef,
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

    const [submittingData, setSubmittingData] = React.useState(false)
    const [listingCreated, setListingCreated] = React.useState(false)

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
        if (!emailAddress || emailAddressError)
            return true
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
        memoError,
        emailAddress,
        emailAddressError
    ])

    const createListing = async () => {
        try {
            const res = await axios.post('api/createListing', {
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
                emailAddress: emailAddress,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                setTitle('')
                setImageLinks([''])
                setDescription('')
                setNotes('')
                const newSliderKey = sliderKey + 1
                setSliderKey(newSliderKey)
                setUsdAmount('')
                setEosAmount('')
                setTitleError(false)
                setDescriptionError(false)
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
            setSubmittingData(false)
            process.nextTick(() => {
                recaptchaRef.current.reset()
            })
        } catch (error) {
            alert(error)
            setSubmittingData(false)
            process.nextTick(() => {
                recaptchaRef.current.reset()
            })
        }
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

import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {Alert, AlertTitle} from "@material-ui/lab";

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
        sliderKey,
        setSliderKey,
        setUsdAmount,
        setEosAmount,
        setUsdAmountError,
        setEosAmountError,
        recaptchaResponse,
        recaptchaRef,
        title,
        titleError,
        description,
        imageLinks,
        keywords,
        setTitle,
        setTitleError,
        setDescription,
        setImageLinks,
        publicListing,
        worldwide,
        countries,
        countriesError,
        setKeywords,
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)
    const [listingCreated, setListingCreated] = React.useState(false)

    const disabled = useMemo(() => {
        if (submittingData) return true
        if (!title || titleError)
            return true
        if (!worldwide) {
            if (countries.length === 0 || countriesError)
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
            if (!memo || memoError)
                return true
        }
        if (!emailAddress || emailAddressError)
            return true
        return false
    }, [
        submittingData,
        title,
        titleError,
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
        memo,
        memoError,
        emailAddress,
        emailAddressError
    ])

    const createPost = async () => {
        try {
            const res = await axios.post('api/createListing', {
                publicListing: publicListing,
                worldwide: worldwide,
                countries: countries,
                imageLinks: imageLinks,
                title: title,
                description: description,
                keywords: keywords,
                quantity: quantity,
                saleMethod: saleMethod,
                maximumPercentLessThan: maximumPercentLessThan,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                eosAccountName: eosAccountName,
                addMemo: addMemo,
                memo: memo,
                emailAddress: emailAddress,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                setImageLinks([''])
                setTitle('')
                setDescription('')
                const newSliderKey = sliderKey + 1
                setSliderKey(newSliderKey)
                setUsdAmount('')
                setEosAmount('')
                setKeywords([])
                setTitleError(false)
                setUsdAmountError(false)
                setEosAmountError(false)
                setListingCreated(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (error) {
            alert(error)
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (submittingData && recaptchaResponse) createPost()
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
                        <AlertTitle>Success</AlertTitle>
                        Your listing was created. A link to your manager was sent to your email.
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

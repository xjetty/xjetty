import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {Alert, AlertTitle} from "@material-ui/lab";

const CreatePostActionComponent = () => {
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
        setEosAccountNameError,
        setMemoError,
        setEmailAddressError,
        recaptchaResponse,
        recaptchaRef,
        title,
        titleError,
        description,
        imageLink,
        keywords,
        setTitle,
        setTitleError,
        setDescription,
        setDescriptionError,
        setImageLink,
        subcategoryDisabled,
        mode,
        platforms,
        category,
        subcategory,
        modeError,
        platformsError,
        categoryError,
        subcategoryError,
        setCategory,
        setSubcategory,
        setKeywords,
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)
    const [postCreated, setPostCreated] = React.useState(false)

    const disabled = useMemo(() => {
        if (submittingData) return true
        if (!mode || modeError)
            return true
        if (!platforms || platformsError)
            return true
        if (!category || categoryError)
            return true
        if (!subcategoryDisabled) {
            if (!subcategory || subcategoryError)
                return true
        }
        if (!title || titleError)
            return true
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
        mode,
        modeError,
        platforms,
        platformsError,
        category,
        categoryError,
        subcategoryDisabled,
        subcategory,
        subcategoryError,
        title,
        titleError,
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
            const res = await axios.post('api/createPost', {
                mode: mode,
                platforms: platforms,
                category: category,
                subcategory: subcategory,
                imageLink: imageLink,
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
                setImageLink('')
                setTitle('')
                setDescription('')
                const newSliderKey = sliderKey + 1
                setSliderKey(newSliderKey)
                setUsdAmount('')
                setEosAmount('')
                setCategory(null)
                setSubcategory(null)
                setKeywords([])
                setTitleError(false)
                setUsdAmountError(false)
                setEosAmountError(false)
                setEosAccountNameError(false)
                setMemoError(false)
                setEmailAddressError(false)
                setPostCreated(true)
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
        setPostCreated(false)
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    return (
        <Grid container spacing={2}>
            {submittingData && (
                <Grid item xs={12}>
                    <LinearProgress color="secondary"/>
                </Grid>
            )}
            {postCreated && (
                <Grid item xs={12}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your post was created. A link to your manager was sent to your email.
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <Button
                    key={disabled}
                    onClick={handle}
                    disabled={disabled}
                    variant="contained"
                    color="secondary">
                    Create post
                </Button>
            </Grid>
        </Grid>
    )
}

export default CreatePostActionComponent

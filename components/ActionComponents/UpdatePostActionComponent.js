import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'

const UpdatePostActionComponent = (props) => {
    const {
        mode,
        modeError,
        platforms,
        platformsError,
        category,
        categoryError,
        subcategory,
        subcategoryError,
        subcategoryDisabled,
        usdAmountError,
        eosAmountError,
        eosAccountNameError,
        memoError,
        addMemo,
        usdAmount,
        eosAmount,
        eosAccountName,
        memo,
        quantity,
        saleMethod,
        fixedAmount,
        maximumPercentLessThan,
        setSnackbarOpen,
        setSnackbarMessage,
        setShowOffers,
        title,
        titleError,
        description,
        descriptionError,
        imageLink,
        keywords
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)

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
        if (!description || descriptionError)
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
        description,
        descriptionError,
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
    ])

    const updatePost = async () => {
        setSubmittingData(true)
        try {
            const res = await axios.post('../api/updatePost', {
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
                token: props.token
            })
            const data = res.data
            if (data.success) {
                if (saleMethod !== 'askingPriceOnly') {
                    setShowOffers(true)
                } else
                    setShowOffers(false)
                setSnackbarMessage('Post updated successfully')
                setSnackbarOpen(true)
            } else
                alert('Something went wrong')
        } catch (error) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
    }

    return (
        <>
            {submittingData && (
                <Grid item xs={12}>
                    <LinearProgress/>
                </Grid>
            )}
            <Grid item xs={12}>
                <Button
                    onClick={updatePost}
                    disabled={disabled}
                    variant="contained"
                    color="primary">
                    Update post
                </Button>
            </Grid>
        </>
    )
}

export default UpdatePostActionComponent

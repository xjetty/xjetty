import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'

const UpdateListingActionComponent = ({token}) => {

    const {
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
        title,
        titleError,
        description,
        imageLinks,
        keywords,
        publicListing,
        worldwide,
        countries,
        countriesError,
        setShowOffers,
        setSnackbarMessage,
        setSnackbarOpen,
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)

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
        memoError
    ])

    const updatePost = async () => {
        setSubmittingData(true)
        try {
            const res = await axios.post('../api/updateListing', {
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
                    key={disabled}
                    onClick={updatePost}
                    disabled={disabled}
                    variant="contained"
                    color="primary">
                    Update listing
                </Button>
            </Grid>
        </>
    )
}

export default UpdateListingActionComponent

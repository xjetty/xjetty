import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'

const BuyItNowActionComponent = () => {
    const [submittingData, setSubmittingData] = React.useState(false)

    const {
        eosAccountNameError,
        associativePrivateKeyError,
        emailAddressError,
        recaptchaRef,
        eosAccountName,
        associativePrivateKey,
        comments,
        setEosAccountName,
        setAssociativePrivateKey,
        setComments,
        setEmailAddress,
        setEosAccountNameError,
        setAssociativePrivateKeyError,
        setEmailAddressError,
        emailAddress,
        code,
        recaptchaResponse,
        offer,
        token,
        memo,
        pageTimestamp,
        eosAccount,
        setMemo,
        setEosAccountItems,
        setEosAccount,
    } = useContext(AppContext)

    const submitRecaptcha = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const buyItNow = async () => {
        try {
            const res = await axios.post('../api/buyItNow', {
                eosAccount: eosAccount,
                eosAccountName: eosAccountName,
                associativePrivateKey: associativePrivateKey,
                memo: memo,
                comments: comments,
                emailAddress: emailAddress,
                offer: offer,
                recaptchaResponse: recaptchaResponse,
                pageTimestamp: pageTimestamp,
                code: code,
                token: token
            })
            const data = res.data
            if (data.success) {
                setEosAccountName('')
                setAssociativePrivateKey('')
                setMemo('')
                setComments('')
                setEosAccountNameError(false)
                setAssociativePrivateKeyError(false)
                if (!offer) {
                    setEmailAddress('')
                    setEmailAddressError(false)
                }
                const eosAccountToken = data.eosAccountToken
                const eosAccountName = data.eosAccountName
                if (eosAccountToken) {
                    const eosAccountItem = {token: eosAccountToken, eosAccountName: eosAccountName}
                    let eosAccountItems = JSON.parse(localStorage.getItem('eosAccountItems'))
                    if (eosAccountItems) {
                        eosAccountItems.push(eosAccountItem)
                    } else
                        eosAccountItems = eosAccountItem
                    localStorage.setItem('eosAccountItems', JSON.stringify(eosAccountItems))
                    setEosAccountItems(eosAccountItems)
                    setEosAccount(eosAccountToken)
                }
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
            setSubmittingData(false)
            process.nextTick(() => {
                recaptchaRef.current.reset()
            })
        } catch (error) {
            alert('Lost Internet connection')
            setSubmittingData(false)
            process.nextTick(() => {
                recaptchaRef.current.reset()
            })
        }
    }

    useEffect(() => {
        if (submittingData && recaptchaResponse)
            buyItNow()
    }, [recaptchaResponse])

    const disabled = useMemo(() => {
        if (eosAccount === 'New') {
            return (
                eosAccountNameError ||
                associativePrivateKeyError ||
                emailAddressError ||
                !eosAccountName ||
                !associativePrivateKey ||
                !emailAddress ||
                submittingData
            )
        } else {
            return (
                emailAddressError ||
                !emailAddress ||
                submittingData
            )
        }
    }, [eosAccountNameError, associativePrivateKeyError, emailAddressError, submittingData, eosAccount])

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
                        Confirm and pay
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default BuyItNowActionComponent

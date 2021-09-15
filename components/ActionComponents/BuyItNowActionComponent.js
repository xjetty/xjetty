import {Button, Grid, LinearProgress} from '@material-ui/core'
import React, {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {Alert, AlertTitle} from "@material-ui/lab";

const BuyItNowActionComponent = ({code, token}) => {
    const [submittingData, setSubmittingData] = React.useState(false)
    const [postCreated, setPostCreated] = React.useState(false)

    const {
        eosAccountNameError,
        associativePrivateKeyError,
        emailAddressError,
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
        offer,
        memo,
        pageTimestamp,
        eosAccount,
        setMemo,
        setEosAccountItems,
        setEosAccount,
        addMemo,
        memoError,
        setMemoError,
    } = useContext(AppContext)

    const buyItNow = async () => {
        setSubmittingData(true)
        setPostCreated(false)
        try {
            const res = await axios.post('../api/buyItNow', {
                eosAccount: eosAccount,
                eosAccountName: eosAccountName,
                associativePrivateKey: associativePrivateKey,
                memo: memo,
                comments: comments,
                emailAddress: emailAddress,
                offer: offer,
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
                setMemoError(false)
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
                        eosAccountItems = [eosAccountItem]
                    localStorage.setItem('eosAccountItems', JSON.stringify(eosAccountItems))
                    localStorage.setItem('eosAccountToken', JSON.stringify(eosAccountToken))
                    setEosAccountItems(eosAccountItems)
                    setEosAccount(eosAccountToken)
                }
                setPostCreated(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
            setSubmittingData(false)
        } catch (error) {
            alert('Lost Internet connection')
            setSubmittingData(false)
        }
    }

    const disabled = useMemo(() => {
        if (submittingData)
            return true
        if (eosAccount === 'New') {
            if (addMemo) {
                return (
                    eosAccountNameError ||
                    associativePrivateKeyError ||
                    emailAddressError ||
                    memoError ||
                    !eosAccountName ||
                    !associativePrivateKey ||
                    !emailAddress ||
                    !memo
                )
            } else {
                return (
                    eosAccountNameError ||
                    associativePrivateKeyError ||
                    emailAddressError ||
                    !eosAccountName ||
                    !associativePrivateKey ||
                    !emailAddress
                )
            }
        } else {
            return (
                emailAddressError ||
                !emailAddress
            )
        }
    }, [eosAccountNameError, associativePrivateKeyError, emailAddressError, submittingData, eosAccount, eosAccountName, associativePrivateKey, emailAddress, memo, memoError, addMemo])

    return (
        <>
            {submittingData && (
                <Grid item xs={12}>
                    <LinearProgress color="secondary"/>
                </Grid>
            )}
            {postCreated && (
                <Grid item xs={12}>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your transaction went through. A link to your message board was sent to your email.
                    </Alert>
                </Grid>
            )}
            <Grid item xs={12}>
                <Button
                    onClick={buyItNow}
                    disabled={disabled}
                    variant="contained"
                    color="secondary">
                    Confirm and pay
                </Button>
            </Grid>
        </>
    )
}

export default BuyItNowActionComponent

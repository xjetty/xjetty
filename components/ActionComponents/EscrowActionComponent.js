import {Button, Card, CardContent, Grid, LinearProgress} from "@material-ui/core";
import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";

const EscrowActionComponent = (props) => {

    const [submittingData, setSubmittingData] = React.useState(false)
    const [buttonAction, setButtonAction] = React.useState('')

    const {
        recaptchaRef,
        recaptchaResponse,
        escrowDetails,
        setEscrowDetails,
        setSnackbarOpen,
        setSnackbarMessage
    } = useContext(AppContext)

    const submitRecaptcha = (buttonAction) => {
        setSubmittingData(true)
        setButtonAction(buttonAction)
        recaptchaRef.current.execute()
    }

    const manageEscrow = async () => {
        try {
            const res = await axios.post('../api/manageEscrow', {
                token: props.token,
                recaptchaResponse: recaptchaResponse,
                buttonAction: buttonAction
            })
            const data = res.data
            if (data.success) {
                const escrowDetailsData = escrowDetails
                const timestamp = data.timestamp
                if (buttonAction === 'releaseEscrow') {
                    escrowDetailsData.escrowReleased = true
                    escrowDetailsData.escrowReleasedOnTimestamp = timestamp
                    setSnackbarMessage('Escrow released successfully')
                } else if (buttonAction === 'refundEscrow') {
                    escrowDetailsData.escrowRefunded = true
                    escrowDetailsData.escrowRefundedOnTimestamp = timestamp
                    setSnackbarMessage('Escrow refunded successfully')
                } else {
                    escrowDetailsData.disputeOpened = true
                    escrowDetailsData.disputeOpenedOnTimestamp = timestamp
                    setSnackbarMessage('Dispute opened successfully')
                }
                setEscrowDetails(escrowDetailsData)
                setSnackbarOpen(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (recaptchaResponse && submittingData)
            manageEscrow()
    }, [recaptchaResponse])

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        {submittingData && (<Grid item xs={12}>
                            <LinearProgress/>
                        </Grid>)}
                        {props.user === 'buyer' ? (
                            <>
                                <Grid item xs={12}>
                                    <Button
                                        onClick={submitRecaptcha('releaseEscrow')}
                                        disabled={submittingData}
                                        variant="contained"
                                        color="primary">
                                        Release escrow
                                    </Button>
                                    {!escrowDetails.disputeOpened && (
                                        <Button
                                            onClick={submitRecaptcha('openDispute')}
                                            disabled={submittingData}
                                            variant="contained"
                                            color="primary">
                                            Open dispute
                                        </Button>
                                    )}
                                </Grid>
                            </>
                        ) : !escrowDetails.escrowRefunded ? (
                            <Grid item xs={12}>
                                <Button
                                    onClick={submitRecaptcha('refundEscrow')}
                                    disabled={submittingData}
                                    variant="contained"
                                    color="primary">
                                    Refund escrow
                                </Button>
                            </Grid>
                        ) : ('')}
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default EscrowActionComponent
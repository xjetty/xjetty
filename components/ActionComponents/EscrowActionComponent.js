import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    LinearProgress, Paper
} from "@material-ui/core";
import React, {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import Draggable from "react-draggable";

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}

const EscrowActionComponent = (props) => {

    const [open, setOpen] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [submittingData, setSubmittingData] = React.useState(false)
    const [buttonAction, setButtonAction] = React.useState('')

    const {
        escrowDetails,
        setEscrowDetails,
        setSnackbarOpen,
        setSnackbarMessage
    } = useContext(AppContext)

    const manageEscrow = async () => {
        try {
            const res = await axios.post('../api/manageEscrow', {
                token: props.token,
                buttonAction: buttonAction
            })
            const data = res.data
            if (data.success) {
                const escrowDetailsData = escrowDetails
                const timestamp = data.timestamp
                const transactionId = data.transactionId
                if (buttonAction === 'releaseEscrow') {
                    escrowDetailsData.escrowReleased = true
                    escrowDetailsData.escrowReleasedOnTimestamp = timestamp
                    escrowDetailsData.transactionId = transactionId
                    setSnackbarMessage('Escrow released successfully')
                } else if (buttonAction === 'refundEscrow') {
                    escrowDetailsData.escrowRefunded = true
                    escrowDetailsData.escrowRefundedOnTimestamp = timestamp
                    escrowDetailsData.transactionId = transactionId
                    setSnackbarMessage('Escrow refunded successfully')
                } else {
                    escrowDetailsData.disputeOpened = true
                    escrowDetailsData.disputeOpenedOnTimestamp = timestamp
                    setSnackbarMessage('Dispute opened successfully')
                }
                setEscrowDetails(escrowDetailsData)
                setOpen(false)
                setSnackbarOpen(true)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
    }

    const handleClose = () => {
        if (!submittingData)
            setOpen(false)
    }

    const handleNo = () => {
        setOpen(false)
    }

    const handleYes = () => {
        setSubmittingData(true)
        manageEscrow()
    }

    const handleButton = (event, buttonAction, title) => {
        setButtonAction(buttonAction)
        setTitle(title)
        setOpen(true)
    }

    return (
        <>
            <Grid container spacing={2}>
                {props.user === 'buyer' ? (
                    <>
                        <Grid item xs={12}>
                            <Button disabled={escrowDetails.escrowReleased || escrowDetails.escrowRefunded} onClick={(event) => handleButton(event, 'releaseEscrow', 'Release escrow?')}
                                    variant="contained" color="primary">Release escrow</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button disabled={escrowDetails.escrowReleased || escrowDetails.escrowRefunded || escrowDetails.disputeOpened} onClick={(event) => handleButton(event, 'openDispute', 'Open dispute?')}
                                    variant="contained" color="secondary">Open dispute</Button>
                        </Grid>
                    </>
                ) : (
                    <Grid item xs={12}>
                        <Button disabled={escrowDetails.escrowReleased || escrowDetails.escrowRefunded} onClick={(event) => handleButton(event, 'refundEscrow', 'Refund escrow?')}
                                variant="contained" color="secondary">Refund escrow</Button>
                    </Grid>
                )}
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                fullWidth
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                This cannot be undone.
                            </Grid>
                            {submittingData && (<Grid item xs={12}>
                                <LinearProgress/>
                            </Grid>)}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={submittingData} autoFocus onClick={handleNo} color="primary">
                        No
                    </Button>
                    <Button disabled={submittingData} onClick={handleYes} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EscrowActionComponent
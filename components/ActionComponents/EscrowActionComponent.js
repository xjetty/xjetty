import {
    Button,
    Card, CardActions,
    CardContent,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    LinearProgress, List, ListItem, ListItemIcon, ListItemText, Paper
} from "@material-ui/core";
import React, {useContext, useEffect} from "react";
import {AppContext} from "../../contexts/AppContext";
import axios from "axios";
import Draggable from "react-draggable";
import {LockOpen, MeetingRoom} from '@material-ui/icons'

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
        recaptchaRef,
        recaptchaResponse,
        escrowDetails,
        setEscrowDetails,
        setSnackbarOpen,
        setSnackbarMessage
    } = useContext(AppContext)

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

    const handleClose = () => {
        if (!submittingData)
            setOpen(false)
    }

    const handleNo = () => {
        setOpen(false)
    }

    const handleYes = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const handleButton = (buttonAction, title) => {
        setButtonAction(buttonAction)
        setTitle(title)
        setOpen(true)
    }

    useEffect(() => {
        if (recaptchaResponse && submittingData)
            manageEscrow()
    }, [recaptchaResponse])

    return (
        <>
            <Card>
                <CardContent>

                    <List component="nav">
                        <ListItem button>
                            <ListItemIcon>
                                <LockOpen />
                            </ListItemIcon>
                            <ListItemText primary="Release escrow" />
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon>
                                <MeetingRoom />
                            </ListItemIcon>
                            <ListItemText primary="Open dispute" />
                        </ListItem>
                    </List>

                    {/*<Grid container spacing={2}>*/}
                    {/*    {props.user === 'buyer' ? (*/}
                    {/*        <>*/}
                    {/*            <Grid item xs={12}>*/}
                    {/*                <Button*/}
                    {/*                    onClick={handleButton.bind(this, 'releaseEscrow', 'Release escrow?')}*/}
                    {/*                    variant="contained"*/}
                    {/*                    color="primary">*/}
                    {/*                    Release escrow*/}
                    {/*                </Button>*/}
                    {/*                {!escrowDetails.disputeOpened && (*/}
                    {/*                    <Button*/}
                    {/*                        onClick={handleButton.bind(this, 'openDispute', 'Open dispute?')}*/}
                    {/*                        variant="contained"*/}
                    {/*                        color="primary">*/}
                    {/*                        Open dispute*/}
                    {/*                    </Button>*/}
                    {/*                )}*/}
                    {/*            </Grid>*/}
                    {/*        </>*/}
                    {/*    ) : (*/}
                    {/*        <Grid item xs={12}>*/}
                    {/*            <Button*/}
                    {/*                onClick={handleButton.bind(this, 'refundEscrow', 'Refund escrow?')}*/}
                    {/*                variant="contained"*/}
                    {/*                color="primary">*/}
                    {/*                Refund escrow*/}
                    {/*            </Button>*/}
                    {/*        </Grid>*/}
                    {/*    )}*/}
                    {/*</Grid>*/}
                </CardContent>
                <CardActions>

                </CardActions>
            </Card>
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
                                This decision is final.
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
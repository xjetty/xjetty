import {
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField
} from "@material-ui/core";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import {FileCopy, Public} from "@material-ui/icons";
import OpenInNew from "@material-ui/icons/OpenInNew";

const EscrowDetailsComponent = () => {
    const {escrowDetails, setSnackbarMessage, setSnackbarOpen} = useContext(AppContext)
    const datetimeOptions = {
        day: 'numeric',
        month: 'long',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        timeZoneName: 'short'
    }
    const getDatetime = (timestamp) => {
        return new Date(timestamp).toLocaleString('en-US', datetimeOptions)
    }
    const copy = () => {
        let textField = document.createElement('textarea')
        textField.innerText = escrowDetails.transactionId
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setSnackbarMessage('Copied to clipboard')
        setSnackbarOpen(true)
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={escrowDetails.transactionId ? escrowDetails.transactionId : ''}
                        disabled={!escrowDetails.transactionId}
                        fullWidth
                        label="Transaction ID"
                        variant="filled"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disabled={!escrowDetails.transactionId} onClick={copy}>
                                        <FileCopy/>
                                    </IconButton>
                                    <IconButton
                                        disabled={!escrowDetails.transactionId}
                                        href={`https://bloks.io/transaction/${escrowDetails.transactionId}`}
                                        target="_blank">
                                        <OpenInNew/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <List disablePadding>
                        <ListItem disableGutters>
                            <ListItemText
                                primary={escrowDetails.escrowReleased ? getDatetime(escrowDetails.escrowReleasedOnTimestamp) : '-'}
                                secondary="Released on"
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText
                                primary={escrowDetails.escrowRefunded ? getDatetime(escrowDetails.escrowRefundedOnTimestamp) : '-'}
                                secondary="Refunded on"
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText
                                primary={escrowDetails.disputeOpened ? getDatetime(escrowDetails.disputeOpenedOnTimestamp) : '-'}
                                secondary="Dispute opened on"
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText
                                primary={escrowDetails.disputeResolved ? getDatetime(escrowDetails.disputeResolvedOnTimestamp) : '-'}
                                secondary="Dispute resolved on"
                            />
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={escrowDetails.disputeResolution ? escrowDetails.disputeResolution : ''}
                        disabled={!escrowDetails.disputeResolution}
                        fullWidth
                        multiline
                        label="Dispute resolution"
                        variant="filled"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default EscrowDetailsComponent
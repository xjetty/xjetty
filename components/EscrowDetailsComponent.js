import {Grid, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Typography} from "@material-ui/core";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";
import {FileCopy} from "@material-ui/icons";
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
                        value={escrowDetails.transactionId ? escrowDetails.transactionId : 'N/A'}
                        fullWidth
                        label="Transaction ID"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={copy}>
                                        <FileCopy/>
                                    </IconButton>
                                    <IconButton
                                        href={`https://bloks.io/transaction/${escrowDetails.transactionId}`}
                                        target="_blank">
                                        <OpenInNew/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={escrowDetails.escrowReleased ? getDatetime(escrowDetails.escrowReleasedOnTimestamp) : 'N/A'}
                        fullWidth
                        label="Escrow released on"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={escrowDetails.escrowRefunded ? getDatetime(escrowDetails.escrowRefundedOnTimestamp) : 'N/A'}
                        fullWidth
                        label="Escrow refunded on"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={escrowDetails.disputeOpened ? getDatetime(escrowDetails.disputeOpenedOnTimestamp) : 'N/A'}
                        fullWidth
                        label="Dispute opened on"
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        value={escrowDetails.disputeResolved ? getDatetime(escrowDetails.disputeResolvedOnTimestamp) : 'N/A'}
                        fullWidth
                        label="Dispute resolved on"
                        variant="outlined"
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
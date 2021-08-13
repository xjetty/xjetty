import {Card, CardContent, Grid, List, ListItem, ListItemText, TextField} from "@material-ui/core";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const EscrowDetailsComponent = () => {
    const {escrowDetails} = useContext(AppContext)
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
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={escrowDetails.transactionId ? escrowDetails.transactionId : 'N/A'}
                                fullWidth
                                label="Escrow transaction ID"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={escrowDetails.escrowReleased ? getDatetime(escrowDetails.escrowReleasedOnTimestamp) : 'N/A'}
                                fullWidth
                                label="Escrow released on"
                                variant="filled"
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
                                variant="filled"
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
                                variant="filled"
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
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default EscrowDetailsComponent
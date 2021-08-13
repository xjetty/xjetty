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
                        {escrowDetails.transactionId && (<Grid item xs={12} md={6}>
                            <TextField
                                value={escrowDetails.transactionId}
                                fullWidth
                                label="Escrow transaction ID"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>)}
                        {escrowDetails.escrowReleased && (<Grid item xs={12} md={6}>
                            <TextField
                                value={getDatetime(escrowDetails.escrowReleasedOnTimestamp)}
                                fullWidth
                                label="Escrow released"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>)}
                        {escrowDetails.escrowRefunded && (<Grid item xs={12} md={6}>
                            <TextField
                                value={getDatetime(escrowDetails.escrowRefundedOnTimestamp)}
                                fullWidth
                                label="Escrow refunded"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>)}
                        {escrowDetails.disputeOpened && (<Grid item xs={12} md={6}>
                            <TextField
                                value={getDatetime(escrowDetails.disputeOpenedOnTimestamp)}
                                fullWidth
                                label="Dispute opened"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>)}
                        {escrowDetails.disputeResolved && (<Grid item xs={12} md={6}>
                            <TextField
                                value={getDatetime(escrowDetails.disputeResolvedOnTimestamp)}
                                fullWidth
                                label="Dispute resolved"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>)}
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}

export default EscrowDetailsComponent
import {Card, CardContent, List, ListItem, ListItemText} from "@material-ui/core";
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
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={escrowDetails.transactionId ? escrowDetails.transactionId : 'N/A'}
                                secondary="Escrow Transaction ID"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={escrowDetails.escrowReleased ? getDatetime(escrowDetails.escrowReleasedOnTimestamp) : 'N/A'}
                                secondary="Escrow Released On"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={escrowDetails.escrowRefunded ? getDatetime(escrowDetails.escrowRefundedOnTimestamp) : 'N/A'}
                                secondary="Escrow Refunded On"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={escrowDetails.disputeOpened ? getDatetime(escrowDetails.disputeOpenedOnTimestamp) : 'N/A'}
                                secondary="Dispute Opened On"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={escrowDetails.disputeResolved ? getDatetime(escrowDetails.disputeResolvedOnTimestamp) : 'N/A'}
                                secondary="Dispute Resolved On"
                            />
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </>
    )
}

export default EscrowDetailsComponent
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid, IconButton,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import OpenInNew from '@material-ui/icons/OpenInNew'

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    }
}))

const ListingDetailsComponent = (props) => {
    const classes = useStyles()

    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Listing Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary={props.listingDetails.transactionId}
                                secondary="Transaction ID"
                            />
                            <ListItemSecondaryAction>
                                <IconButton href={`https://bloks.io/transaction/${props.listingDetails.transactionId}`}
                                            target="_blank" edge="end" aria-label="delete">
                                    <OpenInNew/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={props.listingDetails.fixedAmount.toUpperCase()}
                                secondary="Fixed Amount"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={props.listingDetails.usdAmount}
                                secondary="USD Amount"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={`${props.listingDetails.eosAmount} EOS`}
                                secondary="EOS Amount"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={props.listingDetails.useEscrow ? 'Used' : 'Not used'}
                                secondary="Escrow"
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary={props.listingDetails.notes}
                                secondary="Notes"
                            />
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ListingDetailsComponent
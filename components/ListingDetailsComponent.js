import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid, IconButton, InputAdornment,
    List,
    ListItem, ListItemSecondaryAction,
    ListItemText, TextField,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useContext, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import OpenInNew from '@material-ui/icons/OpenInNew'
import {FileCopy} from "@material-ui/icons";
import {AppContext} from "../contexts/AppContext";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    }
}))

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

const ListingDetailsComponent = (props) => {
    const classes = useStyles()
    const {setSnackbarMessage, setSnackbarOpen} = useContext(AppContext)
    const copy = () => {
        let textField = document.createElement('textarea')
        textField.innerText = props.listingDetails.transactionId
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setSnackbarMessage('Copied to clipboard')
        setSnackbarOpen(true)
    }
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Listing Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                value={props.listingDetails.notes}
                                fullWidth
                                label="Notes"
                                multiline
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.listingDetails.fixedAmount.toUpperCase()}
                                fullWidth
                                label="Fixed amount"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.listingDetails.usdAmount}
                                fullWidth
                                label="USD amount"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={`${props.listingDetails.eosAmount} EOS`}
                                fullWidth
                                label="EOS amount"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.listingDetails.useEscrow ? 'Used' : 'Not used'}
                                fullWidth
                                label="Escrow"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={props.listingDetails.transactionId}
                                fullWidth
                                label="Transaction ID"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={copy}>
                                                <FileCopy/>
                                            </IconButton>
                                            <IconButton
                                                href={`https://bloks.io/transaction/${props.listingDetails.transactionId}`}
                                                target="_blank">
                                                <OpenInNew/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                    {/*<List>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemText*/}
                    {/*            primary={props.listingDetails.transactionId}*/}
                    {/*            secondary="Transaction ID"*/}
                    {/*        />*/}
                    {/*        <ListItemSecondaryAction>*/}
                    {/*            <IconButton href={`https://bloks.io/transaction/${props.listingDetails.transactionId}`}*/}
                    {/*                        target="_blank" edge="end">*/}
                    {/*                <OpenInNew/>*/}
                    {/*            </IconButton>*/}
                    {/*        </ListItemSecondaryAction>*/}
                    {/*    </ListItem>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemText*/}
                    {/*            primary={props.listingDetails.fixedAmount.toUpperCase()}*/}
                    {/*            secondary="Fixed Amount"*/}
                    {/*        />*/}
                    {/*    </ListItem>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemText*/}
                    {/*            primary={props.listingDetails.usdAmount}*/}
                    {/*            secondary="USD Amount"*/}
                    {/*        />*/}
                    {/*    </ListItem>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemText*/}
                    {/*            primary={`${props.listingDetails.eosAmount} EOS`}*/}
                    {/*            secondary="EOS Amount"*/}
                    {/*        />*/}
                    {/*    </ListItem>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemText*/}
                    {/*            primary={props.listingDetails.useEscrow ? 'Used' : 'Not used'}*/}
                    {/*            secondary="Escrow"*/}
                    {/*        />*/}
                    {/*    </ListItem>*/}
                    {/*    <ListItem>*/}
                    {/*        <ListItemText*/}
                    {/*            primary={props.listingDetails.notes}*/}
                    {/*            secondary="Notes"*/}
                    {/*        />*/}
                    {/*    </ListItem>*/}
                    {/*</List>*/}
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ListingDetailsComponent
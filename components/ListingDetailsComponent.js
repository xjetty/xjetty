import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid, IconButton, InputAdornment,
    TextField,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useContext} from "react";
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
                    <Typography className={classes.heading}>Receipt</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.createdOnDatetime}
                                fullWidth
                                label="Purchased on"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={props.listingDetails.publicListing ? 'True' : 'False'}
                                fullWidth
                                label="Public listing"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={props.listingDetails.title}
                                fullWidth
                                label="Title"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={props.listingDetails.description ? props.listingDetails.description : ''}
                                disabled={!props.listingDetails.description}
                                fullWidth
                                multiline
                                label="Description"
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
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ListingDetailsComponent
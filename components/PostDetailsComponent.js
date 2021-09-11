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

const PostDetailsComponent = (props) => {
    const classes = useStyles()
    const {setSnackbarMessage, setSnackbarOpen} = useContext(AppContext)
    const copy = () => {
        let textField = document.createElement('textarea')
        textField.innerText = props.postDetails.transactionId
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
                    <Typography className={classes.heading}>Proof of purchase</Typography>
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
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.postDetails.mode}
                                fullWidth
                                label="Mode"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.postDetails.platforms.join(', ')}
                                fullWidth
                                label="Platforms"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                value={props.postDetails.category}
                                fullWidth
                                label="Category"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        {props.postDetails.subcategory && (<Grid item xs={12} md={6}>
                            <TextField
                                value={props.postDetails.subcategory}
                                fullWidth
                                label="Subcategory"
                                variant="filled"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>)}
                        <Grid item xs={12}>
                            <TextField
                                value={props.postDetails.title}
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
                                value={props.postDetails.description}
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
                                value={props.postDetails.fixedAmount.toUpperCase()}
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
                                value={props.postDetails.usdAmount}
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
                                value={`${props.postDetails.eosAmount} EOS`}
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
                                value={props.postDetails.transactionId}
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
                                                href={`https://bloks.io/transaction/${props.postDetails.transactionId}`}
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

export default PostDetailsComponent
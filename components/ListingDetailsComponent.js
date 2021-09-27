import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Avatar, Divider,
    Grid, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText,
    TextField,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, {useContext} from "react";
import OpenInNew from '@material-ui/icons/OpenInNew'
import {AccountBalance, FileCopy, Public, Today} from "@material-ui/icons";
import {AppContext} from "../contexts/AppContext";

const ListingDetailsComponent = (props) => {
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
                    <Typography>Receipt</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <List disablePadding>
                                <ListItem disableGutters>
                                    <ListItemIcon>
                                        <Today/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={props.createdOnDatetime}
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemText primary={props.listingDetails.condition} secondary="Condition"/>
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon>
                                        <Public/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={props.listingDetails.worldwide ? 'Worldwide' : props.listingDetails.countries.join(', ')}
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    <ListItemIcon>
                                        <AccountBalance/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={props.listingDetails.useEscrow ? 'Escrow used' : 'Escrow not used'}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider/>
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
                        <Grid item xs={12}>
                            <List disablePadding>
                                <ListItem divider disableGutters>
                                    {props.listingDetails.fixedAmount !== 'usd' && (<ListItemAvatar>
                                        <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                src="/eos-logo.svg"/>
                                    </ListItemAvatar>)}
                                    <ListItemText
                                        primary={props.listingDetails.fixedAmount === 'usd' ? props.listingDetails.usdAmount : `${props.listingDetails.eosAmount} EOS`}
                                        secondary="Fixed"
                                    />
                                </ListItem>
                                <ListItem disableGutters>
                                    {props.listingDetails.fixedAmount === 'usd' && (<ListItemAvatar>
                                        <Avatar alt="EOS Logo" imgProps={{style: {objectFit: "initial"}}}
                                                src="/eos-logo.svg"/>
                                    </ListItemAvatar>)}
                                    <ListItemText
                                        primary={props.listingDetails.fixedAmount !== 'usd' ? props.listingDetails.usdAmount : `${props.listingDetails.eosAmount} EOS`}
                                    />
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default ListingDetailsComponent
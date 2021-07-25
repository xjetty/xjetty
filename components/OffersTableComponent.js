import React from 'react';
import {useContext, useEffect} from "react";
import {AppContext} from "../contexts/AppContext";
import Draggable from 'react-draggable';
import {
    Button,
    Card, CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid, IconButton, LinearProgress, Paper, Tooltip
} from "@material-ui/core";
import axios from "axios";
import MUIDataTable from 'mui-datatables'
import {ThumbDownTwoTone, ThumbUpTwoTone} from "@material-ui/icons";

const columns = [
    {
        name: "status",
        label: "Status",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "statusUpdatedOn",
        label: "Status Updated On",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "fixedAmount",
        label: "Fixed Amount",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "usdAmount",
        label: "USD Amount",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "eosAmount",
        label: "EOS Amount",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "createdOn",
        label: "Received On",
        options: {
            filter: false,
            sort: true,
        }
    },
]

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    )
}

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

const eosFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
})

const OffersTableComponent = () => {
    const {
        token,
        offers,
        eosRate,
        recaptchaRef,
        recaptchaResponse,
        setSnackbarOpen,
        setSnackbarMessage,
    } = useContext(AppContext)
    const [rows, setRows] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [decision, setDecision] = React.useState('')
    const [submittingData, setSubmittingData] = React.useState(false)
    const [offerTokens, setOfferTokens] = React.useState([])
    const [rowsSelected, setRowsSelected] = React.useState([])

    const options = {
        filterType: 'checkbox',
        elevation: 0,
        isRowSelectable: (dataIndex) => {
            return rows[dataIndex].status === 'Accept or Decline'
        },
        onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
            setRowsSelected(rowsSelected)
        },
        rowsSelected: rowsSelected,
        customToolbarSelect: () => {
            return (
                <div style={{marginRight: '24px'}}>
                    <Tooltip title={'Accept'}>
                        <IconButton onClick={acceptOffer}>
                            <ThumbUpTwoTone/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Decline'}>
                        <IconButton onClick={declineOffer}>
                            <ThumbDownTwoTone/>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        },
    }

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

    useEffect(() => {
        if (offers && offers.length) {
            const rowData = []
            offers.forEach((offer, index) => {
                const status = offer.status
                const fixedAmount = offer.fixedAmount
                const usdAmountValue = offer.usdAmount
                const eosAmountValue = offer.eosAmount
                let usdAmount = ''
                let eosAmount = ''
                if (fixedAmount === 'usd') {
                    usdAmount = usdFormatter.format(usdAmountValue)
                    eosAmount = eosFormatter.format(usdAmountValue / eosRate).replace('$', '')
                } else {
                    usdAmount = usdFormatter.format(eosAmountValue * eosRate)
                    eosAmount = eosFormatter.format(eosAmountValue).replace('$', '')
                }
                const statusUpdatedOnTimestamp = offer.statusUpdatedOnTimestamp
                let statusUpdatedOnDatetime = 'Never'
                if (statusUpdatedOnTimestamp)
                    statusUpdatedOnDatetime = getDatetime(statusUpdatedOnTimestamp)
                rowData.push({
                    id: index,
                    offerToken: offer.offerToken,
                    status: status,
                    statusUpdatedOn: statusUpdatedOnDatetime,
                    fixedAmount: offer.fixedAmount.toUpperCase(),
                    usdAmount: usdAmount,
                    eosAmount: eosAmount,
                    createdOn: getDatetime(offer.createdOnTimestamp)
                })
            })
            setRows(rowData.reverse())
        }
    }, [offers])

    useEffect(() => {
        if (rows && rows.length) {
            const rowData = rows
            rowData.forEach((offer, index) => {
                const fixedAmount = offer.fixedAmount
                if (fixedAmount === 'usd') {
                    const usdAmountValue = parseFloat(offer.usdAmount.replaceAll(',', '').replace('$', ''))
                    rowData[index].eosAmount = eosFormatter.format(usdAmountValue / eosRate).replace('$', '')
                } else {
                    const eosAmountValue = parseFloat(offer.eosAmount.replaceAll(',', ''))
                    rowData[index].usdAmount = usdFormatter.format(eosAmountValue * eosRate)
                }
            })
            setRows(rowData)
        }
    }, [eosRate])

    useEffect(() => {
        const tokens = []
        rowsSelected.forEach(function (value) {
            tokens.push(rows[value].offerToken)
        })
        setOfferTokens(tokens)
    }, [rowsSelected])

    const acceptOffer = () => {
        setDecision('accept')
        setTitle('Accept offers?')
        setOpen(true)
    }

    const declineOffer = () => {
        setDecision('decline')
        setTitle('Decline offers?')
        setOpen(true)
    }

    const handleNo = () => {
        setOpen(false)
    }

    const handleYes = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const acceptOrDeclineOffers = async () => {
        try {
            const res = await axios.post('../api/acceptOrDeclineOffers', {
                decision: decision,
                offerTokens: offerTokens,
                token: token,
                recaptchaResponse: recaptchaResponse
            })
            const data = res.data
            if (data.success) {
                const rowData = rows
                const datetime = getDatetime(data.timestamp)
                rowsSelected.forEach(function (dataIndex) {
                    if (decision === 'accept') {
                        rowData[dataIndex].status = 'Accepted'
                        rowData[dataIndex].statusUpdatedOn = datetime
                    } else {
                        rowData[dataIndex].status = 'Declined'
                        rowData[dataIndex].statusUpdatedOn = datetime
                    }
                })
                setRows(rowData)
                setRowsSelected([])
                setOpen(false)
                if (decision === 'accept') {
                    setSnackbarMessage('Offers accepted successfully')
                } else
                    setSnackbarMessage('Offers declined successfully')
                setSnackbarOpen(true)
            } else
                alert('Something went wrong')
        } catch (error) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (submittingData && recaptchaResponse)
            acceptOrDeclineOffers()
    }, [recaptchaResponse])

    const handleClose = () => {
        if (!submittingData)
            setOpen(false)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            {rows.length ? (<MUIDataTable
                                title={"Offers"}
                                data={rows}
                                columns={columns}
                                options={options}
                            />) : null}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                fullWidth
            >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                This decision is final.
                            </Grid>
                            {submittingData && (<Grid item xs={12}>
                                <LinearProgress/>
                            </Grid>)}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={submittingData} autoFocus onClick={handleNo} color="primary">
                        No
                    </Button>
                    <Button disabled={submittingData} onClick={handleYes} color="primary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OffersTableComponent
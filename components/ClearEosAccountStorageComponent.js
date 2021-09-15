import {Button} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const ClearEosAccountStorageComponent = () => {
    const {
        setEosAccountItems,
        setEosAccount,
        setSnackbarMessage,
        setSnackbarOpen
    } = useContext(AppContext)
    const clear = () => {
        const eosAccountItems = localStorage.getItem('eosAccountItems')
        const eosAccountToken = localStorage.getItem('eosAccountToken')
        if (eosAccountItems)
            localStorage.removeItem('eosAccountItems')
        if (eosAccountToken)
            localStorage.removeItem('eosAccountToken')
        setEosAccountItems([])
        setEosAccount('New')
        setSnackbarMessage('EOS account storage cleared')
        setSnackbarOpen(true)
    }
    return (
        <Button onClick={clear} variant="text" color="primary" endIcon={<Delete/>}>
            Clear eos account storage
        </Button>
    )
}

export default ClearEosAccountStorageComponent
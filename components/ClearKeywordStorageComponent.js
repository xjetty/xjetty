import {Button} from "@material-ui/core";
import {ClearAll, Delete} from "@material-ui/icons";
import React, {useContext} from "react";
import {AppContext} from "../contexts/AppContext";

const ClearKeywordStorageComponent = () => {
    const {
        setKeywordItems,
        setSnackbarMessage,
        setSnackbarOpen
    } = useContext(AppContext)
    const clear = () => {
        const keywordItems = localStorage.getItem('keywordItems')
        if (keywordItems)
            localStorage.removeItem('keywordItems')
        setKeywordItems([])
        setSnackbarMessage('Keyword storage cleared')
        setSnackbarOpen(true)
    }
    return (
        <Button onClick={clear} variant="text" color="secondary" startIcon={<ClearAll/>}>
            Clear keyword storage
        </Button>
    )
}

export default ClearKeywordStorageComponent
import React, {useContext} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import {AppContext} from '../contexts/AppContext'

const SnackbarComponent = () => {
    const {snackbarOpen, setSnackbarOpen, snackbarMessage} =
        useContext(AppContext)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return
        setSnackbarOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message={snackbarMessage}
            action={
                <React.Fragment>
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </React.Fragment>
            }
        />
    )
}

export default SnackbarComponent

import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {AppContext} from "../contexts/AppContext";

const DialogComponent = () => {
    const {dialogOpen, dialogHasTitle, dialogTitle, dialogText, setDialogOpen} = useContext(AppContext)

    const handleClose = () => {
        setDialogOpen(false)
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            fullWidth
        >
            {dialogHasTitle && (<DialogTitle>{dialogTitle}</DialogTitle>)}
            <DialogContent>
                <DialogContentText>
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent
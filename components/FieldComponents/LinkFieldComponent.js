import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import React, {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {FileCopy} from '@material-ui/icons'
import OpenInNew from "@material-ui/icons/OpenInNew";

const LinkFieldComponent = () => {
    const {link, setSnackbarOpen, setSnackbarMessage} =
        useContext(AppContext)

    const copy = () => {
        let textField = document.createElement('textarea')
        textField.innerText = link
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setSnackbarMessage('Copied to clipboard')
        setSnackbarOpen(true)
    }

    return (
        <TextField
            InputProps={{
                readOnly: true,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={copy}>
                            <FileCopy/>
                        </IconButton>
                        <IconButton
                            href={link}
                            target="_blank">
                            <OpenInNew/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
            value={link}
            fullWidth
            label="Link"
            variant="filled"
        />
    )
}

export default LinkFieldComponent

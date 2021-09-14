import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {FileCopy} from '@material-ui/icons'

const CodeFieldComponent = () => {
    const {linkCode, setSnackbarOpen, setSnackbarMessage} =
        useContext(AppContext)

    const copy = () => {
        let textField = document.createElement('textarea')
        textField.innerText = linkCode
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
                    </InputAdornment>
                )
            }}
            value={linkCode}
            fullWidth
            label="Code"
            variant="outlined"
        />
    )
}

export default CodeFieldComponent

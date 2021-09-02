import {TextField} from '@material-ui/core'
import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'

const MessageFieldComponent = () => {
    const {message, setMessage, messageError, setMessageError} = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        const valueTrim = value.trim()
        if (!valueTrim) {
            setMessageError(true)
        } else setMessageError(false)
        setMessage(value)
    }

    const checkError = () => {
        const valueTrim = message.trim()
        if (!messageError) {
            if (!valueTrim) {
                setMessageError(true)
            } else setMessageError(false)
        }
    }

    const helperText = useMemo(() => {
        if (messageError) {
            if (!message.trim())
                return 'Message is required'
        }
    }, [messageError, message])

    return (
        <TextField
            InputLabelProps={{required: true}}
            value={message}
            error={messageError}
            helperText={helperText}
            onChange={handle}
            fullWidth
            label="Message"
            onBlur={checkError}
            variant="filled"
            multiline
        />
    )
}

export default MessageFieldComponent

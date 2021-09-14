import {TextField} from '@material-ui/core'
import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'

const AssociativePrivateKeyFieldComponent = () => {
    const {
        associativePrivateKey,
        setAssociativePrivateKey,
        associativePrivateKeyError,
        setAssociativePrivateKeyError
    } = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        let valueTrim = value.trim()
        if (!valueTrim) {
            setAssociativePrivateKeyError(true)
        } else setAssociativePrivateKeyError(false)
        setAssociativePrivateKey(value)
    }

    const helperText = useMemo(() => {
        if (associativePrivateKeyError) {
            return 'Associative private key is required'
        } else return ''
    }, [associativePrivateKeyError])

    const checkError = () => {
        const valueTrim = associativePrivateKey.trim()
        if (!valueTrim) {
            setAssociativePrivateKeyError(true)
        } else setAssociativePrivateKeyError(false)
    }

    return (
        <TextField
            InputLabelProps={{required: true}}
            error={associativePrivateKeyError}
            helperText={helperText}
            onBlur={checkError}
            value={associativePrivateKey}
            onChange={handle}
            fullWidth
            label="Associative private key"
            variant="outlined"
            multiline
        />
    )
}

export default AssociativePrivateKeyFieldComponent

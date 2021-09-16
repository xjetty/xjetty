import MaskedInput from 'react-text-mask'
import {TextField} from '@material-ui/core'
import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import EosApi from 'eosjs-api'

const mask = (props) => {
    const {inputRef, ...other} = props

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={[
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/,
                /[a-z0-5]/
            ]}
            guide={false}
        />
    )
}

const EosAccountNameFieldComponent = () => {
    const {
        eosAccountName,
        setEosAccountName,
        eosAccountNameError,
        setEosAccountNameError
    } = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        if (!value) {
            setEosAccountNameError(true)
        } else if (value.length === 12) {
            setEosAccountNameError(false)
        } else setEosAccountNameError(true)
        setEosAccountName(value)
    }

    const verify = async () => {
        if (!eosAccountNameError) {
            let error = false
            const eos = EosApi({
                httpEndpoint: process.env.EOS_NODE_SERVER_MAIN.slice(0, -1)
            })
            try {
                await eos.getAccount(eosAccountName)
            } catch (err) {
                error = true
            }
            setEosAccountNameError(error)
        }
    }

    const helperText = useMemo(() => {
        if (eosAccountNameError) {
            if (!eosAccountName) {
                return 'EOS account name is required'
            } else return 'EOS account name must be valid'
        } else return ''
    }, [eosAccountNameError, eosAccountName])

    const checkError = () => {
        if (!eosAccountNameError && !eosAccountName)
            setEosAccountNameError(true)
    }

    return (
        <TextField
            InputLabelProps={{required: true}}
            onKeyUp={verify}
            error={eosAccountNameError}
            helperText={helperText}
            onBlur={checkError}
            value={eosAccountName}
            onChange={handle}
            InputProps={{inputComponent: mask}}
            fullWidth
            label="EOS account name"
            variant="filled"
        />
    )
}

export default EosAccountNameFieldComponent

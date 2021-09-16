import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'
import EmailValidator from 'email-validator'
import {TextField} from '@material-ui/core'

const EmailAddressFieldComponent = () => {
    const {
        emailAddress,
        setEmailAddress,
        emailAddressError,
        setEmailAddressError,
        offer
    } = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        const valueTrim = value.trim()
        if (!valueTrim) {
            setEmailAddressError(true)
        } else {
            const emailAddressValid = EmailValidator.validate(valueTrim)
            if (!emailAddressValid) {
                setEmailAddressError(true)
            } else setEmailAddressError(false)
        }
        setEmailAddress(value)
    }

    const checkError = () => {
        const valueTrim = emailAddress.trim()
        if (!emailAddressError) {
            if (!valueTrim) {
                setEmailAddressError(true)
            } else setEmailAddressError(false)
        }
    }

    const helperText = useMemo(() => {
        if (emailAddressError) {
            if (!emailAddress.trim()) {
                return 'Email address is required'
            } else return 'Email address must be valid'
        }
    }, [emailAddressError, emailAddress])

    return (
        <TextField
            InputLabelProps={{required: true}}
            autoComplete="email"
            disabled={offer}
            error={emailAddressError}
            helperText={helperText}
            value={emailAddress}
            onChange={handle}
            onBlur={checkError}
            fullWidth
            label="Email address"
            variant="filled"
        />
    )
}

export default EmailAddressFieldComponent

import React, {useMemo, useContext} from 'react'
import {TextField} from '@material-ui/core'
import {AppContext} from '../../contexts/AppContext'

const DescriptionFieldComponent = () => {
    const {description, setDescription, descriptionError, setDescriptionError} = useContext(AppContext)

    const helperText = useMemo(() => {
        if (descriptionError) {
            return 'Description is required'
        } else return ''
    }, [descriptionError])

    const handle = (event) => {
        const value = event.target.value
        const valueTrim = value.trim()
        if (!valueTrim) {
            setDescriptionError(true)
        } else setDescriptionError(false)
        setDescription(value)
    }

    const checkError = () => {
        const valueTrim = description.trim()
        if (!valueTrim) {
            setDescriptionError(true)
        } else setDescriptionError(false)
    }

    return (
        <TextField
            InputLabelProps={{required: true}}
            error={descriptionError}
            value={description}
            onChange={handle}
            onBlur={checkError}
            fullWidth
            label="Description"
            multiline
            variant="filled"
            helperText={helperText}
        />
    )
}

export default DescriptionFieldComponent

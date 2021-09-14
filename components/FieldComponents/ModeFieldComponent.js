import React, {useContext, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {modeOptions} from '../../modeOptions'

const ModeFieldComponent = () => {
    const {mode, setMode, modeError, setModeError} = useContext(AppContext)

    const handleChange = (event, value) => {
        if (value) {
            setModeError(false)
        } else
            setModeError(true)
        setMode(value)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (mode) {
                setModeError(false)
            } else
                setModeError(true)
        }
    }

    const helperText = useMemo(() => {
        if (modeError) {
            return 'Mode is required'
        } else return ''
    }, [modeError])

    return (
        <Autocomplete
            value={mode}
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            options={modeOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    error={modeError}
                    helperText={helperText}
                    variant="outlined"
                    label="Mode"
                />
            )}
        />
    )
}

export default ModeFieldComponent
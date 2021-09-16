import React, {useContext, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {modeOptions} from '../../modeOptions'

const ModesFieldComponent = () => {
    const {modes, setModes} = useContext(AppContext)

    const handleChange = (event, value) => {
        setModes(value)
    }

    return (
        <Autocomplete
            value={modes}
            openOnFocus
            onChange={handleChange}
            options={modeOptions}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            multiple
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Modes"
                />
            )}
        />
    )
}

export default ModesFieldComponent
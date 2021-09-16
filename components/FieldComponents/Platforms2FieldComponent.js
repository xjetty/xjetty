import React, {useContext} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {platformOptions} from '../../platformOptions'

const Platforms2FieldComponent = () => {
    const {platforms2, setPlatforms2} = useContext(AppContext)

    const handleChange = (event, value) => {
        setPlatforms2(value)
    }

    return (
        <Autocomplete
            openOnFocus
            onChange={handleChange}
            multiple
            value={platforms2}
            disableCloseOnSelect
            options={platformOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Platforms"
                    placeholder="Platform"
                />
            )}
        />
    )
}

export default Platforms2FieldComponent
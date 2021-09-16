import React, {useContext, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {platformOptions} from '../../platformOptions'

const CountriesFieldComponent = () => {
    const {platforms, setPlatforms, platformsError, setPlatformsError} = useContext(AppContext)

    const handleChange = (event, value) => {
        if (value.length > 0) {
            setPlatformsError(false)
        } else
            setPlatformsError(true)
        setPlatforms(value)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (platforms.length > 0) {
                setPlatformsError(false)
            } else
                setPlatformsError(true)
        }
    }

    const helperText = useMemo(() => {
        if (platformsError) {
            return 'Platforms is required'
        } else return ''
    }, [platformsError])

    return (
        <Autocomplete
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            multiple
            value={platforms}
            disableCloseOnSelect
            options={platformOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    required
                    error={platformsError}
                    helperText={helperText}
                    variant="filled"
                    label="Platforms"
                    placeholder="Platform"
                />
            )}
        />
    )
}

export default CountriesFieldComponent
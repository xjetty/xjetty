import React, {useContext, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {countryOptions} from '../../countryOptions'

const CountryFieldComponent = () => {
    const {country, setCountry, countryError, setCountryError} = useContext(AppContext)

    const handleChange = (event, value) => {
        if (!value) {
            setCountryError(true)
        } else
            setCountryError(false)
        setCountry(value)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (!country) {
                setCountryError(true)
            } else
                setCountryError(false)
        }
    }

    const helperText = useMemo(() => {
        if (countryError) {
            return 'Country is required'
        } else return ''
    }, [countryError])

    return (
        <Autocomplete
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            value={country}
            disableCloseOnSelect
            options={countryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    required
                    error={countryError}
                    helperText={helperText}
                    variant="filled"
                    label="Country"
                />
            )}
        />
    )
}

export default CountryFieldComponent
import React, {useContext, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {countryOptions} from '../../countryOptions'

const CountriesFieldComponent = () => {
    const {countries, setCountries, countriesError, setCountriesError} = useContext(AppContext)

    const handleChange = (event, value) => {
        if (value.length > 0) {
            setCountriesError(false)
        } else
            setCountriesError(true)
        setCountries(value)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (countries.length > 0) {
                setCountriesError(false)
            } else
                setCountriesError(true)
        }
    }

    const helperText = useMemo(() => {
        if (countriesError) {
            return 'Countries is required'
        } else return ''
    }, [countriesError])

    return (
        <Autocomplete
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            multiple
            value={countries}
            disableCloseOnSelect
            options={countryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    required
                    error={countriesError}
                    helperText={helperText}
                    variant="filled"
                    label="Countries"
                    placeholder="Country"
                />
            )}
        />
    )
}

export default CountriesFieldComponent
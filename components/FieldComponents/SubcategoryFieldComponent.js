import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {categoryAndSubcategoryOptions} from '../../categoryAndSubcategoryOptions'

const SubcategoryFieldComponent = () => {
    const {
        category,
        categoryError,
        subcategory,
        setSubcategory,
        subcategoryError,
        setSubcategoryError,
        setSubcategoryDisabled,
    } = useContext(AppContext)

    const subcategoryOptions = useMemo(() => {
        if (category && !categoryError) {
            return categoryAndSubcategoryOptions.find(x => x.category === category).subcategories
        } else
            return []
    }, [category, categoryError])

    const handleChange = (event, value) => {
        if (value) {
            setSubcategoryError(false)
        } else
            setSubcategoryError(true)
        setSubcategory(value)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (subcategory) {
                setSubcategoryError(false)
            } else
                setSubcategoryError(true)
        }
    }

    const helperText = useMemo(() => {
        if (subcategoryError) {
            return 'Subcategory is required'
        } else return ''
    }, [subcategoryError])

    const disabled = useMemo(() => {
        if (subcategoryOptions.length > 0) {
            if (!category || categoryError) {
                return true
            } else
                return false
        } else
            return true
    }, [category, categoryError, subcategoryOptions])

    useEffect(() => {
        setSubcategoryDisabled(disabled)
    }, [disabled])

    return (
        <Autocomplete
            key={disabled}
            value={subcategory}
            disabled={disabled}
            openOnFocus
            onClose={checkError}
            onChange={handleChange}
            options={subcategoryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    required={!disabled}
                    {...params}
                    error={subcategoryError}
                    helperText={helperText}
                    variant="filled"
                    label="Subcategory"
                />
            )}
        />
    )
}

export default SubcategoryFieldComponent
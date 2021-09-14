import React, {useContext, useEffect, useMemo, useState} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";

const CategoryFieldComponent = () => {
    const {
        category,
        setCategory,
        categoryError,
        setCategoryError,
        setSubcategory,
        categoryAndSubcategoryOptions
    } = useContext(AppContext)

    const categoryOptions = categoryAndSubcategoryOptions.map(x => x.category)

    const handleChange = (event, value) => {
        if (value) {
            setCategoryError(false)
        } else
            setCategoryError(true)
        setCategory(value)
        setSubcategory(null)
    }

    const checkError = (event, reason) => {
        if (reason === 'blur') {
            if (category) {
                setCategoryError(false)
            } else
                setCategoryError(true)
        }
    }

    const helperText = useMemo(() => {
        if (categoryError) {
            return 'Category is required'
        } else return ''
    }, [categoryError])

    return (
        <Autocomplete
            openOnFocus
            onClose={checkError}
            value={category}
            onChange={handleChange}
            options={categoryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    required
                    {...params}
                    error={categoryError}
                    helperText={helperText}
                    variant="outlined"
                    label="Category"
                />
            )}
        />
    )
}

export default CategoryFieldComponent
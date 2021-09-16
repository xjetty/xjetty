import React, {useContext, useEffect, useMemo} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {categoryAndSubcategoryOptions} from '../../categoryAndSubcategoryOptions'

const SubcategoryFieldComponent = () => {
    const {
        categories,
        subcategories,
        setSubcategories,
        setSubcategoryDisabled,
    } = useContext(AppContext)

    const subcategoryOptions = useMemo(() => {
        if (categories.length > 0) {
            let subcategories = []
            categories.forEach(function (value) {
                const data = categoryAndSubcategoryOptions.find(x => x.category === value).subcategories
                subcategories = [...subcategories, ...data]
            })
            return [...new Set(subcategories)]
        } else
            return []
    }, [categories])

    const handleChange = (event, value) => {
        setSubcategories(value)
    }

    const disabled = useMemo(() => {
        if (subcategoryOptions.length > 0) {
            return !categories.length > 0
        } else
            return true
    }, [categories, subcategoryOptions])

    useEffect(() => {
        setSubcategoryDisabled(disabled)
    }, [disabled])

    return (
        <Autocomplete
            key={disabled}
            value={subcategories}
            disabled={disabled}
            multiple
            disableCloseOnSelect
            openOnFocus
            onChange={handleChange}
            options={subcategoryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Subcategories"
                />
            )}
        />
    )
}

export default SubcategoryFieldComponent
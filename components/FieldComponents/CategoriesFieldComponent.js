import React, {useContext} from 'react'
import {AppContext} from "../../contexts/AppContext"
import {TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {categoryAndSubcategoryOptions} from '../../categoryAndSubcategoryOptions'

const CategoryFieldComponent = () => {
    const {
        categories,
        setCategories,
        setSubcategories,
    } = useContext(AppContext)

    const categoryOptions = categoryAndSubcategoryOptions.map(x => x.category)

    const handleChange = (event, value) => {
        setCategories(value)
        setSubcategories([])
    }

    return (
        <Autocomplete
            openOnFocus
            value={categories}
            multiple
            disableCloseOnSelect
            onChange={handleChange}
            options={categoryOptions}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Categories"
                />
            )}
        />
    )
}

export default CategoryFieldComponent
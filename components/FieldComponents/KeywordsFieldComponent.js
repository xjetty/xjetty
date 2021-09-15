import {TextField} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Autocomplete} from "@material-ui/lab";

const KeywordsFieldComponent = () => {
    const {keywords, setKeywords, keywordItems, setKeywordItems} = useContext(AppContext)

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const handleChange = (event, value) => {
        if (value.length > 0) {
            let newKeywordItems = [...keywordItems, value[value.length - 1]]
            newKeywordItems = newKeywordItems.filter(onlyUnique)
            localStorage.setItem('keywordItems', JSON.stringify(newKeywordItems))
            setKeywordItems(newKeywordItems)
        }
        setKeywords(value)
    }

    useEffect(() => {
        const keywordItems = localStorage.getItem('keywordItems')
        if (keywordItems)
            setKeywordItems(JSON.parse(localStorage.getItem('keywordItems')))
    }, [])

    return (
        <Autocomplete
            freeSolo
            openOnFocus
            value={keywords}
            onChange={handleChange}
            multiple
            disableCloseOnSelect
            options={keywordItems}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Keywords"
                    placeholder="Keyword"
                />
            )}
        />
    )
}

export default KeywordsFieldComponent

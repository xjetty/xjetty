import {TextField} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Autocomplete} from "@material-ui/lab";

const KeywordsFieldComponent = () => {
    const {keywords, setKeywords} = useContext(AppContext)
    const [keywordItems, setKeywordItems] = React.useState([])

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index
    }

    const handleChange = (event, value) => {
        setKeywords(value)
        let newKeywordItems = [...keywordItems, value[value.length - 1]]
        newKeywordItems = newKeywordItems.filter(onlyUnique)
        localStorage.setItem('keywordItems', JSON.stringify(newKeywordItems))
        setKeywordItems(newKeywordItems)
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
            onChange={handleChange}
            multiple
            options={keywordItems}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="filled"
                    label="Keywords"
                    placeholder="Keyword"
                />
            )}
        />
    )
}

export default KeywordsFieldComponent

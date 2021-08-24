import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const KeywordsFieldComponent = () => {
    const {keywords, setKeywords} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setKeywords(value)
    }

    return (
        <TextField
            helperText="Use a comma to separate keywords"
            value={keywords}
            onChange={handle}
            fullWidth
            label="Keywords"
            variant="filled"
            multiline
        />
    )
}

export default KeywordsFieldComponent

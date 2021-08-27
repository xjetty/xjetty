import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import ChipInput from 'material-ui-chip-input';

const KeywordsFieldComponent = () => {
    const {keywords, setKeywords} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setKeywords(value)
    }

    return (
        <ChipInput
            value={keywords}
            fullWidth
            onChange={handle}
            label="Keywords"
            variant="filled"
        />
    )
}

export default KeywordsFieldComponent

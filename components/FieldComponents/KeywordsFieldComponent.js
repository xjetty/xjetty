import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import ChipInput from 'material-ui-chip-input'

const KeywordsFieldComponent = () => {
    const {keywords, setKeywords} = useContext(AppContext)

    const handleAddChip = (chip) => {
        const keywords = [...keywords, chip]
        setKeywords(keywords)
    }

    const handleDeleteChip = (chip, index) => {
        const keywords = [...keywords]
        keywords.splice(index, 1)
        setKeywords(keywords)
    }

    return (
        <ChipInput
            fullWidth
            inputLabelProps={{required: true}}
            value={keywords}
            alwaysShowPlaceholder
            placeholder="Press enter after every keyword"
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip, index) => handleDeleteChip(chip, index)}
            variant="filled"
            label="Keywords"
        />
    )
}

export default KeywordsFieldComponent

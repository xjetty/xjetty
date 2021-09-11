import {TextField} from '@material-ui/core'
import {useContext, useMemo} from 'react'
import {AppContext} from '../../contexts/AppContext'

const TitleFieldComponent = () => {
    const {imageLink, setImageLink} = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        setImageLink(value)
    }

    return (
        <TextField
            value={imageLink}
            onChange={handle}
            fullWidth
            label="Image link"
            variant="filled"
        />
    )
}

export default TitleFieldComponent

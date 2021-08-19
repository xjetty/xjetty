import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const DisplayImageLinkFieldComponent = () => {
    const {displayImageLink, setDisplayImageLink} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setDisplayImageLink(value)
    }

    return (
        <TextField
            value={displayImageLink}
            onChange={handle}
            fullWidth
            label="Display image link"
            variant="filled"
            multiline
        />
    )
}

export default DisplayImageLinkFieldComponent

import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const ImageLinkFieldComponent = () => {
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
            label="Image link"
            variant="filled"
            multiline
        />
    )
}

export default ImageLinkFieldComponent

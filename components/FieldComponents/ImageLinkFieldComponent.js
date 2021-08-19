import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {AddCircle} from "@material-ui/icons";

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
            label="Image link 1"
            variant="filled"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <AddCircle/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default ImageLinkFieldComponent

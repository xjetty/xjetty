import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Remove} from "@material-ui/icons";

const ImageLinksFieldComponent = (props) => {
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
            label={`Image link ${props.index}`}
            variant="filled"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <Remove/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default ImageLinksFieldComponent

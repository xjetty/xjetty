import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Remove} from "@material-ui/icons";

const ImageLinksFieldComponent = (props) => {
    const {imageLinks} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        props.value = value
    }

    return (
        <TextField
            value={props.value}
            onChange={handle}
            fullWidth
            label={`Image link ${props.index + 2}`}
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

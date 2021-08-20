import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Remove} from "@material-ui/icons";

const ImageLinksFieldComponent = (props) => {
    const {imageLinks, setImageLinks} = useContext(AppContext)

    const handle = (event, index) => {
        const value = event.target.value
        const imageLinks = [...imageLinks]
        imageLinks[index] = value
        setImageLinks(imageLinks)
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

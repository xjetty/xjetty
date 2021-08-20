import {IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Add} from "@material-ui/icons";

const ImageLinkFieldComponent = () => {
    const {displayImageLink, setDisplayImageLink, setImageLinks, imageLinks} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setDisplayImageLink(value)
    }

    const handleImageLinks = () =>{
        const newImageLinks = imageLinks
        newImageLinks.push('123')
        setImageLinks(newImageLinks)
        console.log(imageLinks)
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
                        <IconButton onClick={handleImageLinks}>
                            <Add/>
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}

export default ImageLinkFieldComponent

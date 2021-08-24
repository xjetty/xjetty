import {useContext} from "react"
import {Grid, IconButton, InputAdornment, TextField} from "@material-ui/core"
import {Add, Remove} from "@material-ui/icons"
import {AppContext} from "../../contexts/AppContext"

function ImageLinksFieldComponent() {
    const {imageLinks, setImageLinks} = useContext(AppContext)

    const handleInputChange = (e, index) => {
        const {value} = e.target
        const list = [...imageLinks]
        list[index] = value
        setImageLinks(list)
    }

    const handleRemoveClick = index => {
        const list = [...imageLinks]
        list.splice(index, 1)
        setImageLinks(list)
    }

    const handleAddClick = () => {
        setImageLinks([...imageLinks, ''])
    }

    return (
        <>
            {imageLinks.map((x, i) => {
                return (
                    <Grid item xs={12} key={i}>
                        <TextField
                            placeholder="Use a direct link only"
                            value={x}
                            onChange={e => handleInputChange(e, i)}
                            fullWidth
                            label={`Image link ${i + 1}`}
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {imageLinks.length !== 1 && <IconButton onClick={() => handleRemoveClick(i)}>
                                            <Remove/>
                                        </IconButton>}
                                        {imageLinks.length - 1 === i &&
                                        <IconButton onClick={handleAddClick}>
                                            <Add/>
                                        </IconButton>
                                        }
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                )
            })}
        </>
    )
}

export default ImageLinksFieldComponent
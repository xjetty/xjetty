import {Grid, IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Add, Remove} from "@material-ui/icons"

const ImageLinksFieldComponent = () => {
    const {imageLinks, setImageLinks} = useContext(AppContext)

    // handle input change
    const handleInputChange = (e, index) => {
        const {value} = e.target
        const imageLinks = [...imageLinks]
        imageLinks[index] = value
        setImageLinks(imageLinks)
    }

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const imageLinks = [...imageLinks]
        imageLinks.splice(index, 1)
        setImageLinks(imageLinks)
    }

    // handle click event of the Add button
    const handleAddClick = () => {
        setImageLinks([...imageLinks, ''])
    }

    return (
        <>
            {
                imageLinks.map((x, i) => {
                    return (
                        <Grid item xs={12} key={i}>
                            <TextField
                                value={x}
                                onChange={e => handleInputChange(e, i)}
                                fullWidth
                                label={`Image link index`}
                                variant="filled"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleAddClick}>
                                                <Add/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                                // InputProps={{
                                //     endAdornment: (
                                //         <InputAdornment position="end">
                                //             <IconButton>
                                //                 <Remove/>
                                //             </IconButton>
                                //         </InputAdornment>
                                //     )
                                // }}
                            />
                        </Grid>
                    )
                })
            }
        </>

    )

}

export default ImageLinksFieldComponent

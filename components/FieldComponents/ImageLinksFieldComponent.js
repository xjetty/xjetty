import {Grid, IconButton, InputAdornment, TextField} from '@material-ui/core'
import {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {Add, Remove} from "@material-ui/icons"

const ImageLinksFieldComponent = () => {
    const {imageLinks, setImageLinks} = useContext(AppContext)

    useEffect(() => {
        console.log(imageLinks)
    }, [imageLinks])

    const handleInputChange = (e, index) => {
        const {value} = e.target
        const imageLinks = [...imageLinks]
        imageLinks[index] = value
        setImageLinks(imageLinks)
    }

    const handleRemoveClick = index => {
        const imageLinks = [...imageLinks]
        imageLinks.splice(index, 1)
        setImageLinks(imageLinks)
    }

    const handleAddClick = () => {
        setImageLinks([...imageLinks, ''])
    }

    return (
        <>
            {
                imageLinks.map((x, i) => {
                    return (
                        <Grid item xs={12} key={1}>
                            <TextField
                                value={x}
                                onChange={e => handleInputChange(e, i)}
                                fullWidth
                                label={`Image link ${i + 1}`}
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
            <div style={{marginTop: 20}}>{JSON.stringify(imageLinks)}</div>
        </>

    )

}

export default ImageLinksFieldComponent

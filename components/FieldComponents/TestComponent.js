import {useContext, useEffect, useMemo} from "react"
import {Grid, IconButton, InputAdornment, TextField} from "@material-ui/core"
import {Add, Remove} from "@material-ui/icons"
import {AppContext} from "../../contexts/AppContext"
const urlExists = require('url-exists')

function TestComponent() {
    const {inputList, setInputList} = useContext(AppContext)

    const handleInputChange = (e, index) => {
        const {value} = e.target
        const list = [...inputList]
        list[index] = value
        setInputList(list)
    }

    const handleRemoveClick = index => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
    }

    const handleAddClick = () => {
        setInputList([...inputList, ''])
    }

    const hasError = useMemo((x) => {
        if (x.trim()) {
            urlExists(x.trim(), function (err, exists) {
                return !exists
            })
        } else
            return false
    }, [inputList])

    return (
        <>
            {inputList.map((x, i) => {
                return (
                    <Grid item xs={12} key={i}>
                        <TextField
                            value={x}
                            error={hasError(x)}
                            onChange={e => handleInputChange(e, i)}
                            fullWidth
                            label={`Image link ${i + 1}`}
                            variant="filled"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {inputList.length !== 1 && <IconButton onClick={() => handleRemoveClick(i)}>
                                            <Remove/>
                                        </IconButton>}
                                        {inputList.length - 1 === i &&
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

export default TestComponent
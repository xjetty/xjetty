import React, {useContext} from 'react'
import {TextField} from '@material-ui/core'
import {AppContext} from '../../contexts/AppContext'

const DescriptionFieldComponent = () => {
    const {description, setDescription} = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        setDescription(value)
    }

    return (
        <TextField
            value={description}
            onChange={handle}
            fullWidth
            label="Description"
            multiline
            variant="filled"
        />
    )
}

export default DescriptionFieldComponent

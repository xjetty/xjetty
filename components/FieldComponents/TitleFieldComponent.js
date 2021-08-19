import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const TitleFieldComponent = () => {
    const {title, setTitle} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setTitle(value)
    }

    return (
        <TextField
            value={title}
            onChange={handle}
            fullWidth
            label="Title"
            variant="filled"
            multiline
        />
    )
}

export default TitleFieldComponent

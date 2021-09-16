import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const CommentsFieldComponent = () => {
    const {search, setSearch} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setSearch(value)
    }

    return (
        <TextField
            value={search}
            onChange={handle}
            fullWidth
            label="Search"
            variant="filled"
        />
    )
}

export default CommentsFieldComponent

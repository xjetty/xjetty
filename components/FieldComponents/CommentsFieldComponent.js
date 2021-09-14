import {TextField} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const CommentsFieldComponent = () => {
    const {comments, setComments} = useContext(AppContext)

    const handle = (event) => {
        let value = event.target.value
        setComments(value)
    }

    return (
        <TextField
            value={comments}
            onChange={handle}
            fullWidth
            label="Comments"
            variant="outlined"
            multiline
        />
    )
}

export default CommentsFieldComponent

import {FormControlLabel, Switch} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const AddMemoFieldComponent = () => {
    const {addMemo, setAddMemo} = useContext(AppContext)

    const handle = (event) => {
        setAddMemo(event.target.checked)
    }

    return (
        <FormControlLabel
            control={<Switch color="primary" checked={addMemo} onChange={handle} />}
            label="Add memo"
        />
    )
}

export default AddMemoFieldComponent

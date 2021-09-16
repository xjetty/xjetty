import {FormControlLabel, Switch} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const WorldwideFieldComponent = () => {
    const {worldwide, setWorldwide} = useContext(AppContext)

    const handle = (event) => {
        setWorldwide(event.target.checked)
    }

    return (
        <FormControlLabel
            control={<Switch checked={worldwide} onChange={handle} />}
            label="Worldwide"
        />
    )
}

export default WorldwideFieldComponent

import {Checkbox, FormControlLabel} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const UseEscrowFieldComponent = () => {
    const {useEscrow, setUseEscrow} = useContext(AppContext)

    const handle = (event) => {
        setUseEscrow(event.target.checked)
    }

    return (
        <FormControlLabel
            value={useEscrow}
            onChange={handle}
            control={<Checkbox checked={useEscrow}/>}
            label="Use escrow"
        />
    )
}

export default UseEscrowFieldComponent

import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from '@material-ui/core'

const FixedAmountFieldComponent = () => {
    const {fixedAmount, setFixedAmount} = useContext(AppContext)

    function handle(event) {
        setFixedAmount(event.target.value)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Fixed amount</FormLabel>
            <RadioGroup value={fixedAmount} onChange={handle}>
                <FormControlLabel value="usd" control={<Radio color="primary"/>} label="USD" />
                <FormControlLabel value="eos" control={<Radio color="primary"/>} label="EOS" />
            </RadioGroup>
        </FormControl>
    )
}

export default FixedAmountFieldComponent

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup
} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const SaleMethodFieldComponent = () => {
    const {saleMethod, setSaleMethod} = useContext(AppContext)

    const handle = (event) => {
        setSaleMethod(event.target.value)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Sale method</FormLabel>
            <RadioGroup value={saleMethod} onChange={handle}>
                <FormControlLabel
                    value="askingPriceOnly"
                    control={<Radio/>}
                    label="Asking price only"
                />
                <FormControlLabel
                    value="askingPriceAndOffers"
                    control={<Radio/>}
                    label="Asking price and offers"
                />
                <FormControlLabel
                    value="offersOnly"
                    control={<Radio/>}
                    label="Offers only"
                />
            </RadioGroup>
        </FormControl>
    )
}

export default SaleMethodFieldComponent

import {Slider} from '@material-ui/core'
import {AppContext} from '../../contexts/AppContext'
import {useContext} from 'react'

const QuantityFieldComponent = () => {
    const {setQuantity, defaultQuantity, minimumQuantity, sliderKey} = useContext(AppContext)

    const handle = (event, newValue) => {
        setQuantity(newValue)
    }

    return (
        <Slider
            key={sliderKey}
            defaultValue={defaultQuantity}
            onChangeCommitted={handle}
            step={1}
            min={minimumQuantity}
            max={100}
            valueLabelDisplay="on"
        />
    )
}

export default QuantityFieldComponent

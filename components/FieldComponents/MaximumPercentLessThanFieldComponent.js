import {Slider} from '@material-ui/core'
import {useContext} from 'react'
import {AppContext} from '../../contexts/AppContext'

const MaximumPercentLessThanFieldComponent = () => {
    const {maximumPercentLessThan, setMaximumPercentLessThan} = useContext(AppContext)

    const handle = (event, newValue) => {
        setMaximumPercentLessThan(newValue)
    }

    return (
        <Slider
            defaultValue={maximumPercentLessThan}
            onChangeCommitted={handle}
            step={1}
            min={1}
            max={99}
            valueLabelDisplay="on"
        />
    )
}

export default MaximumPercentLessThanFieldComponent

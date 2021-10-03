import React, {useContext, useMemo} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {AppContext} from "../../contexts/AppContext"
import {conditionOptions} from '../../conditionOptions'
import {FormHelperText} from "@material-ui/core";

const ConditionFieldComponent = () => {
    const {condition, setCondition, conditionError, setConditionError} = useContext(AppContext)

    const handle = (event) => {
        const value = event.target.value
        if (value) {
            setConditionError(false)
        } else
            setConditionError(true)
        setCondition(event.target.value)
    }

    const checkError = () => {
        if (!condition) {
            setConditionError(true)
        } else
            setConditionError(false)
    }

    const helperText = useMemo(() => {
        if (conditionError) {
            return 'Condition is required'
        } else return ''
    }, [conditionError])

    return (
        <FormControl required variant="filled" fullWidth error={conditionError}>
            <InputLabel id="condition">Condition</InputLabel>
            <Select
                onClose={checkError}
                labelId="condition"
                value={condition}
                onChange={handle}
                label="Condition"
            >
                {conditionOptions.map((item, index) => (
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
            </Select>
            {conditionError && (<FormHelperText>{helperText}</FormHelperText>)}
        </FormControl>
    )
}

export default ConditionFieldComponent
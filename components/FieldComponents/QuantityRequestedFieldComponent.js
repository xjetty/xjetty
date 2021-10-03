import React, {useContext} from 'react'
import {AppContext} from "../../contexts/AppContext"
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const QuantityRequestedFieldComponent = () => {
    const {quantity, setQuantity, quantityOptions} = useContext(AppContext)

    const handleChange = (event) => {
        setQuantity(event.target.value)
    }

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel id="quantity">Quantity</InputLabel>
            <Select
                labelId="quantity"
                value={quantity}
                onChange={handleChange}
                label="Condition"
            >
                {quantityOptions.map((item, index) => (
                    <MenuItem value={item} key={index}>{item}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default QuantityRequestedFieldComponent
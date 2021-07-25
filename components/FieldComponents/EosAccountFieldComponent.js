import React, {useContext} from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {AppContext} from "../../contexts/AppContext"

const EosAccountFieldComponent = () => {
    const {eosAccount, setEosAccount, eosAccountItems} = useContext(AppContext)

    const handle = (event) => {
        setEosAccount(event.target.value)
    }

    return (
        <FormControl variant="filled" fullWidth>
            <InputLabel id="eos-account">EOS account</InputLabel>
            <Select
                labelId="eos-account"
                value={eosAccount}
                onChange={handle}
            >
                <MenuItem value={'New'}>New</MenuItem>
                {eosAccountItems.map((item, index) => (
                    <MenuItem value={item.token} key={index}>{item.eosAccountName}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default EosAccountFieldComponent
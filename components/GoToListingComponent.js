import MaskedInput from "react-text-mask";
import {IconButton, InputAdornment, TextField} from "@material-ui/core";
import React from "react";
import {Send} from "@material-ui/icons";

const mask = (props) => {
    const {inputRef, ...other} = props

    return (
        <MaskedInput
            {...other}
            ref={(ref) => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={[
                /[a-zA-Z0-9]/,
                /[a-zA-Z0-9]/,
                /[a-zA-Z0-9]/,
                /[a-zA-Z0-9]/,
                /[a-zA-Z0-9]/
            ]}
            guide={false}
        />
    )
}


const GoToListingComponent = () => {
    const [code, setCode] = React.useState('')
    const handle = (event) => {
        const value = event.target.value
        setCode(value)
    }
    return (
        <TextField
            fullWidth
            helperText="Go directly to a listing"
            value={code}
            onChange={handle}
            InputProps={{
                inputComponent: mask, endAdornment: (
                    <InputAdornment position="end">
                        {/* eslint-disable-next-line @next/next/link-passhref */}
                        {code.length === 5 &&
                        <IconButton href={'https://blockcommerc.com/listing/' + code} target="_blank">
                            <Send/>
                        </IconButton>}
                    </InputAdornment>
                )
            }}
            label="I have a code"
            placeholder="Code"
            variant="filled"
        />
    )
}

export default GoToListingComponent
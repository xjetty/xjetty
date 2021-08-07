import MaskedInput from "react-text-mask";
import {Button, Card, CardActions, CardContent, Grid, IconButton, InputAdornment, TextField} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {FileCopy, Send} from "@material-ui/icons";

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
    const goToListing = () => {

    }
    return (
        <TextField
            fullWidth
            value={code}
            onChange={handle}
            InputProps={{inputComponent: mask, endAdornment: (
                    <InputAdornment position="end">
                        {code.length === 5 && <IconButton>
                            <Send/>
                        </IconButton>}
                    </InputAdornment>
                )}}
            label="I have a code"
            placeholder="Code"
            variant="filled"
        />
        // <Card>
        //     <CardContent>
        //         <TextField
        //             value={code}
        //             onChange={handle}
        //             InputProps={{inputComponent: mask}}
        //             fullWidth
        //             label="Code"
        //             variant="filled"
        //         />
        //     </CardContent>
        //     <CardActions>
        //         <Button href={'https://blockcommerc.com/listing/' + code} target="_blank" disabled={code.length !== 5}
        //                 variant="contained" color="secondary">Go to listing</Button>
        //     </CardActions>
        // </Card>

    )
}

export default GoToListingComponent
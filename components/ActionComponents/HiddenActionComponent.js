import {FormControlLabel, MuiThemeProvider, Switch} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {amber} from "@material-ui/core/colors";
import {createTheme} from "@material-ui/core/styles";

const amberTheme = createTheme({palette: {primary: amber}})

const HiddenActionComponent = (props) => {

    const {
        hidden,
        setHidden,
    } = useContext(AppContext)

    const handle = (event) => {
        setHidden(event.target.checked)
        changeHidden()
    }

    const changeHidden = async () => {
        try {
            const res = await axios.post('../api/changeHidden', {
                token: props.token
            })
            const data = res.data
            if (!data.success) {
                alert('Something went wrong')
                setHidden(!hidden)
            }
        } catch (e) {
            alert('Lost Internet connection')
            setHidden(!hidden)
        }
    }

    return (
        <FormControlLabel
            control={<React.Fragment><MuiThemeProvider theme={amberTheme}><Switch checked={hidden} onChange={handle}
                                                                                  color="primary"/></MuiThemeProvider></React.Fragment>}
            label="Hide post"
        />
    )
}

export default HiddenActionComponent

import {FormControlLabel, MuiThemeProvider, Switch} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'
import {amber} from "@material-ui/core/colors";
import {createTheme} from "@material-ui/core/styles";

const amberTheme = createTheme({palette: {primary: amber}})

const HiddenActionComponent = () => {

    const {
        hidden,
        setHidden,
        recaptchaRef,
        recaptchaResponse,
        token,
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)

    const handle = (event) => {
        setHidden(event.target.checked)
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const setHiddenValue = async () => {
        try {
            const res = await axios.post('../api/setHiddenValue', {
                recaptchaResponse: recaptchaResponse,
                token: token
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
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
    }

    useEffect(() => {
        if (submittingData && recaptchaResponse)
            setHiddenValue()
    }, [recaptchaResponse])

    return (
        <FormControlLabel
            control={<React.Fragment><MuiThemeProvider theme={amberTheme}><Switch checked={hidden} onChange={handle}
                                                                                  color="primary"/></MuiThemeProvider></React.Fragment>}
            label="Hide listing"
        />
    )
}

export default HiddenActionComponent

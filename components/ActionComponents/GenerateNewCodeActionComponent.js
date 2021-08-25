import {Button} from '@material-ui/core'
import React, {useContext, useEffect} from 'react'
import {AppContext} from '../../contexts/AppContext'
import axios from 'axios'

const GenerateNewCodeActionComponent = () => {
    const {
        token,
        setLink,
        setLinkCode,
        recaptchaResponse,
        recaptchaRef,
        setSnackbarMessage,
        setSnackbarOpen
    } = useContext(AppContext)

    const [submittingData, setSubmittingData] = React.useState(false)
    const [disabled, setDisabled] = React.useState(false)

    const handle = () => {
        setSubmittingData(true)
        recaptchaRef.current.execute()
    }

    const generateNewCode = async () => {
        setDisabled(true)
        try {
            const res = await axios.post('../api/generateNewCode', {
                recaptchaResponse: recaptchaResponse,
                token: token
            })
            const data = res.data
            if (data.success) {
                const link = data.link
                const code = data.code
                setLink(link)
                setLinkCode(code)
                setSnackbarMessage('New code generated successfully')
                setSnackbarOpen(true)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
        process.nextTick(() => {
            recaptchaRef.current.reset()
        })
        setDisabled(false)
    }

    useEffect(() => {
        if (submittingData && recaptchaResponse)
            generateNewCode()
    }, [recaptchaResponse])

    return (
        <Button
            disabled={disabled}
            onClick={handle}
            variant="contained">
            Get new code
        </Button>
    )
}

export default GenerateNewCodeActionComponent

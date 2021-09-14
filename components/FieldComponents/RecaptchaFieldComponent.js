import ReCAPTCHA from 'react-google-recaptcha'
import React, {useContext} from 'react'
import {AppContext} from "../../contexts/AppContext";

const RecaptchaComponent = () => {
    const {recaptchaRef, setRecaptchaResponse} = useContext(AppContext)

    const handle = (recaptchaResponse) => {
        setRecaptchaResponse(recaptchaResponse)
    }

    return (
        <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            theme="dark"
            sitekey={process.env.RECAPTCHA_SITE_KEY}
            onChange={handle}
        />
    )
}

export default RecaptchaComponent

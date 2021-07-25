import axios from 'axios'

export async function verifyRecaptcha(recaptchaResponse) {
    const result = await axios({
        method: 'POST',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        params: {
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: recaptchaResponse
        }
    })
    const data = result.data
    return data.success
}

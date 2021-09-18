import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import Message from '../../models/Message'
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";

const sendMessage = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        delete data.recaptchaResponse
        data.message = cleanString(data.message)
        await connectToDb()
        try {
            await Message.create(data)
            return res.json({success: true})
        } catch (e) {
            return res.json({success: false})
        }
    } else
        return res.json({success: false})
}

export default sendMessage
import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import Message from '../../models/Message'
import connectToDb from "../../middleware/connectToDb";

const xss = require('xss')

const sendMessage = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        if (!(await verifyRecaptcha(recaptchaResponse)))
            return res.json({success: false})
        delete data.recaptchaResponse
        data.message = xss(data.message, {
            whiteList: {},
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script']
        })
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
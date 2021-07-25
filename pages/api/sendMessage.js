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
            res.json({success: false})
        delete data.recaptchaResponse
        data.message = xss(data.message, {
            whiteList: {},
            stripIgnoreTag: true,
            stripIgnoreTagBody: ['script']
        })
        await connectToDb()
        try {
            await Message.create(data)
            res.json({success: true})
        } catch (e) {
            res.json({success: false})
        }
    } else
        res.json({success: false})
}

export default sendMessage
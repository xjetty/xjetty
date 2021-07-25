import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import MessageBoard from "../../models/MessageBoard";
import jwt from 'jsonwebtoken'
import {sendEmail} from "../../server/sendEmail";
import {getDataFromToken} from "../../server/getDataFromToken";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";

const postMessage = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) res.json({success: false})
        const token = data.token
        const messageBoardData = getDataFromToken(token)
        if (!messageBoardData)
            res.json({success: false, alertMessage: 'Invalid token'})
        const user = messageBoardData.user
        const messageBoardId = messageBoardData.messageBoardId
        const message = cleanString(data.message)
        if (!message)
            res.json({success: false})
        await connectToDb()
        const messageBoardData2 = await MessageBoard.findById(messageBoardId)
        if (!messageBoardData2)
            res.json({success: false, alertMessage: 'Message board not found'})
        const messages = messageBoardData2.messages
        const newMessage = {
            user: user,
            message: message,
            timestamp: Date.now()
        }
        messages.push(newMessage)
        await MessageBoard.updateOne({_id: messageBoardId}, {$set: {messages: messages}})
        const sellerEmailAddress = messageBoardData2.sellerEmailAddress
        const buyerEmailAddress = messageBoardData2.buyerEmailAddress
        if (user === 'seller') {
            const payload = {user: 'buyer', messageBoardId: messageBoardId}
            const token = jwt.sign(payload, process.env.JWT_SIGNATURE)
            let link = `https://blockcommerc.com/message-board/${token}`
            if (!process.env.LIVE)
                link = `http://localhost:3000/message-board/${token}`
            const message = `Go to your message board to read your new message<br><br><a href=${link}>${link}</a>`
            await sendEmail(buyerEmailAddress, 'You have a new message', message)
        } else {
            const payload = {user: 'seller', messageBoardId: messageBoardId}
            const token = jwt.sign(payload, process.env.JWT_SIGNATURE)
            let link = `https://blockcommerc.com/message-board/${token}`
            if (!process.env.LIVE)
                link = `http://localhost:3000/message-board/${token}`
            const message = `Go to your message board to read your new message<br><br><a href=${link}>${link}</a>`
            await sendEmail(sellerEmailAddress, 'You have a new message', message)
        }
        res.json({success: true})
    } else
        res.json({success: false})
}

export default postMessage
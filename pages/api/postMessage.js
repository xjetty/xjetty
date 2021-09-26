import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import MessageBoard from "../../models/MessageBoard";
import jwt from 'jsonwebtoken'
import {sendEmail} from "../../server/sendEmail";
import {getDataFromToken} from "../../server/getDataFromToken";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {getListingPreview} from "../../server/getListingPreview";

const postMessage = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const token = data.token
        let messageBoardData = getDataFromToken(token)
        if (!messageBoardData)
            return res.json({success: false, alertMessage: 'Invalid token'})
        const user = messageBoardData.user
        const messageBoardId = messageBoardData.messageBoardId
        const message = cleanString(data.message)
        if (!message)
            return res.json({success: false})
        await connectToDb()
        messageBoardData = await MessageBoard.findById(messageBoardId)
        if (!messageBoardData)
            return res.json({success: false, alertMessage: 'Message board not found'})
        const sellerEmailAddress = messageBoardData.sellerEmailAddress
        const buyerEmailAddress = messageBoardData.buyerEmailAddress
        const listingDetails = messageBoardData.listingDetails
        const title = listingDetails.title
        const description = listingDetails.description
        const keywords = listingDetails.keywords
        let postPreview = ''
        let emailAddress = ''
        if (user === 'seller') {
            emailAddress = sellerEmailAddress
            postPreview = getListingPreview(title, description, keywords)
        } else {
            emailAddress = buyerEmailAddress
            postPreview = getListingPreview(title, description, [])
        }
        const payload = {user: user, messageBoardId: messageBoardId}
        const messageBoardDataToken = jwt.sign(payload, process.env.JWT_SIGNATURE)
        const link = `https://blockcommerc.com/message-board/${messageBoardDataToken}`
        const subject = `You have a new message! - ${title}`
        const emailMessage = `Go to your message board to read your message.<br /><br /><a href=${link}>${link}</a><br /><br />${postPreview}`
        const messages = messageBoardData.messages
        const newMessage = {
            user: user,
            message: message,
            timestamp: Date.now()
        }
        await MessageBoard.updateOne({_id: messageBoardId}, {$set: {messages: [...messages, newMessage]}})
        await sendEmail(emailAddress, subject, emailMessage)
        return res.json({success: true, message: newMessage})
    } else
        return res.json({success: false})
}

export default postMessage
import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import MessageBoard from "../../models/MessageBoard";
import jwt from 'jsonwebtoken'
import {sendEmail} from "../../server/sendEmail";
import {getDataFromToken} from "../../server/getDataFromToken";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {getPostPreview} from "../../server/getPostPreview";
import {getLocalhost} from "../../server/getLocalhost";

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
        const postDetails = messageBoardData.postDetails
        const mode = postDetails.mode
        const platforms = postDetails.platforms
        const category = postDetails.category
        const subcategory = postDetails.subcategory
        const title = postDetails.title
        const description = postDetails.description
        const keywords = postDetails.keywords
        let postPreview = ''
        let emailAddress = ''
        if (user === 'seller') {
            emailAddress = sellerEmailAddress
            postPreview = getPostPreview(mode, platforms, category, subcategory, title, description, keywords)
        } else {
            emailAddress = buyerEmailAddress
            postPreview = getPostPreview(mode, platforms, category, subcategory, title, description, [])
        }
        const payload = {user: user, messageBoardId: messageBoardId}
        const messageBoardDataToken = jwt.sign(payload, process.env.JWT_SIGNATURE)
        let link = `https://d2rcrypto.com/message-board/${messageBoardDataToken}`
        if (getLocalhost())
            link = `http://localhost:3010/message-board/${messageBoardDataToken}`
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
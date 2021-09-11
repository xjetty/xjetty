import MessageBoard from "../../models/MessageBoard";
import Dispute from "../../models/Dispute";
import Escrow from '../../models/Escrow'
import {attemptTransaction} from "../../server/attemptTransaction";
import connectToDb from "../../middleware/connectToDb";
import {getDataFromToken} from "../../server/getDataFromToken";
import {sendEmail} from "../../server/sendEmail";
import jwt from "jsonwebtoken";
import {getPostPreview} from "../../server/getPostPreview";

const manageEscrow = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        let messageBoardData = getDataFromToken(token)
        if (!messageBoardData)
            return res.json({success: false, alertMessage: 'Invalid token'})
        const messageBoardId = messageBoardData.messageBoardId
        const user = messageBoardData.user
        const buttonAction = data.buttonAction
        if (user === 'buyer') {
            const buttonActions = ['releaseEscrow', 'openDispute']
            if (!buttonActions.includes(buttonAction))
                return res.json({success: false})
        } else {
            if (buttonAction !== 'refundEscrow')
                return res.json({success: false})
        }
        await connectToDb()
        messageBoardData = await MessageBoard.findById(messageBoardId)
        if (!messageBoardData)
            return res.json({success: false, alertMessage: 'Message board not found'})
        const buyerEmailAddress = messageBoardData.buyerEmailAddress
        const sellerEmailAddress = messageBoardData.sellerEmailAddress
        const postDetails = messageBoardData.postDetails
        const mode = postDetails.mode
        const platforms = postDetails.platforms
        const category = postDetails.category
        const subcategory = postDetails.subcategory
        const title = postDetails.title
        const description = postDetails.description
        const keywords = postDetails.keywords
        const transactionQuantity = postDetails.transactionQuantity
        const sellerEosAccountName = postDetails.sellerEosAccountName
        const sellerMemo = postDetails.sellerMemo
        const buyerEosAccountName = postDetails.buyerEosAccountName
        const buyerMemo = postDetails.buyerMemo
        const escrowData = await Escrow.findOne({messageBoardId: messageBoardId})
        if (!escrowData)
            return res.json({success: false, alertMessage: 'Escrow not found'})
        const escrowId = escrowData._id
        const escrowReleased = escrowData.escrowReleased
        const escrowRefunded = escrowData.escrowRefunded
        const disputeOpened = escrowData.disputeOpened
        if (escrowReleased || escrowRefunded)
            return res.json({success: false})
        const timestamp = Date.now()
        const buyerPayload = {user: 'buyer', messageBoardId: messageBoardId}
        const sellerPayload = {user: 'seller', messageBoardId: messageBoardId}
        const buyerToken = jwt.sign(buyerPayload, process.env.JWT_SIGNATURE)
        const sellerToken = jwt.sign(sellerPayload, process.env.JWT_SIGNATURE)
        let linkBuyer = `https://blockcommerc.com/message-board/${buyerToken}`
        let linkSeller = `https://blockcommerc.com/message-board/${sellerToken}`
        if (!process.env.LIVE) {
            linkBuyer = `http://localhost:3000/message-board/${buyerToken}`
            linkSeller = `http://localhost:3000/message-board/${sellerToken}`
        }
        const buyerPostPreview = getPostPreview(mode, platforms, category, subcategory, title, description, [])
        const sellerPostPreview = getPostPreview(mode, platforms, category, subcategory, title, description, keywords)
        const messageSeller = `Go to your message board for review<br /><br /><a href=${linkBuyer}>${linkBuyer}</a><br /><br />${sellerPostPreview}`
        const messageBuyer = `Go to your message board for review<br /><br /><a href=${linkSeller}>${linkSeller}</a><br /><br />${buyerPostPreview}`
        let transactionId = ''
        if (buttonAction === 'releaseEscrow') {
            try {
                const result = await attemptTransaction(
                    transactionQuantity,
                    sellerEosAccountName,
                    process.env.ESCROW_EOS_ACCOUNT_NAME,
                    process.env.ESCROW_ASSOCIATIVE_PRIVATE_KEY,
                    sellerMemo,
                    false
                )
                if (result.json && result.json.code) {
                    const errorMessage = result.json.error.details[0].message
                    return res.json({success: false, reason: errorMessage})
                } else if (!result) {
                    return res.json({success: false})
                } else transactionId = result.transaction_id
            } catch (error) {
                return res.json({success: false})
            }
            await Escrow.updateOne({_id: escrowId}, {
                $set: {
                    escrowReleased: true,
                    escrowReleasedOnTimestamp: timestamp,
                    transactionId: transactionId
                }
            })
            const subjectSeller = `You received an escrow payment! - ${title}`
            const subjectBuyer = `You released an escrow payment! - ${title}`
            await sendEmail(buyerEmailAddress, subjectSeller, messageSeller)
            await sendEmail(sellerEmailAddress, subjectBuyer, messageBuyer)
        } else if (buttonAction === 'refundEscrow') {
            try {
                const result = await attemptTransaction(
                    transactionQuantity,
                    buyerEosAccountName,
                    process.env.ESCROW_EOS_ACCOUNT_NAME,
                    process.env.ESCROW_ASSOCIATIVE_PRIVATE_KEY,
                    buyerMemo,
                    false
                )
                if (result.json && result.json.code) {
                    const errorMessage = result.json.error.details[0].message
                    return res.json({success: false, reason: errorMessage})
                } else if (!result) {
                    return res.json({success: false})
                } else transactionId = result.transaction_id
            } catch (error) {
                return res.json({success: false})
            }
            await Escrow.updateOne({_id: escrowId}, {
                $set: {
                    escrowRefunded: true,
                    escrowRefundedOnTimestamp: timestamp,
                    transactionId: transactionId
                }
            })
            const subjectSeller = `You refunded an escrow payment! - ${title}`
            const subjectBuyer = `You received an escrow refund! - ${title}`
            await sendEmail(buyerEmailAddress, subjectSeller, messageSeller)
            await sendEmail(sellerEmailAddress, subjectBuyer, messageBuyer)
        } else {
            if (disputeOpened || escrowReleased || escrowRefunded)
                return res.json({success: false})
            await Escrow.updateOne({_id: escrowId}, {
                $set: {
                    disputeOpened: true,
                    disputeOpenedOnTimestamp: timestamp
                }
            })
            await Dispute.create({escrowId: escrowId})
        }
        return res.json({success: true, timestamp: timestamp, transactionId: transactionId})
    } else
        return res.json({success: false})
}

export default manageEscrow
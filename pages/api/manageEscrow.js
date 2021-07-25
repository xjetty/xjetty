import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import MessageBoard from "../../models/MessageBoard";
import Dispute from "../../models/Dispute";
import Escrow from '../../models/Escrow'
import {attemptTransaction} from "../../server/attemptTransaction";
import connectToDb from "../../middleware/connectToDb";
import {getDataFromToken} from "../../server/getDataFromToken";
import {sendEmail} from "../../server/sendEmail";
import jwt from "jsonwebtoken";
import {insertBreaks} from "../../server/insertBreaks";

const manageEscrow = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const token = data.token
        const messageBoardData = getDataFromToken(token)
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
        const messageBoardData2 = await MessageBoard.findById(messageBoardId)
        if (!messageBoardData2)
            return res.json({success: false, alertMessage: 'Message board not found'})
        const buyerEmailAddress = messageBoardData2.buyerEmailAddress
        const sellerEmailAddress = messageBoardData2.sellerEmailAddress
        const notes = messageBoardData2.listingDetails.notes
        const escrow = await Escrow.find({messageBoardId: messageBoardId})
        if (!escrow)
            return res.json({success: false, alertMessage: 'Escrow not found'})
        const escrowId = escrow._id
        const escrowReleased = escrow.escrowReleased
        const escrowRefunded = escrow.escrowRefunded
        const disputeOpened = escrow.disputeOpened
        if (user === 'buyer') {
            if (escrowRefunded)
                return res.json({success: false})
        } else {
            if (escrowReleased)
                return res.json({success: false})
        }
        const listingDetails = messageBoardData2.listingDetails
        const transactionQuantity = listingDetails.transactionQuantity
        const timestamp = Date.now()
        if (buttonAction === 'releaseEscrow') {
            const sellerEosAccountName = listingDetails.sellerEosAccountName
            const sellerMemo = listingDetails.sellerMemo
            let transactionId = ''
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
            const subjectSeller = 'You received an escrow payment'
            const subjectBuyer = 'You released an escrow payment'
            const messageSeller = `Go to your message board to find out more details<br><br><a href=${linkBuyer}>${linkBuyer}</a><br><br>Notes: ${insertBreaks(notes)}`
            const messageBuyer = `Go to your message board to find out more details<br><br><a href=${linkSeller}>${linkSeller}</a><br><br>Notes: ${insertBreaks(notes)}`
            await sendEmail(buyerEmailAddress, subjectSeller, messageSeller)
            await sendEmail(sellerEmailAddress, subjectBuyer, messageBuyer)
        } else if (buttonAction === 'refundEscrow') {
            const buyerEosAccountName = listingDetails.buyerEosAccountName
            const buyerMemo = listingDetails.buyerMemo
            let transactionId = ''
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
            const subjectSeller = 'You refunded an escrow payment'
            const subjectBuyer = 'You received an escrow refund'
            const messageSeller = `Go to your message board to find out more details<br><br><a href=${linkBuyer}>${linkBuyer}</a><br><br>Notes: ${insertBreaks(notes)}`
            const messageBuyer = `Go to your message board to find out more details<br><br><a href=${linkSeller}>${linkSeller}</a><br><br>Notes: ${insertBreaks(notes)}`
            await sendEmail(buyerEmailAddress, subjectSeller, messageSeller)
            await sendEmail(sellerEmailAddress, subjectBuyer, messageBuyer)
        } else {
            if (disputeOpened)
                return res.json({success: false})
            await Escrow.updateOne({_id: escrowId}, {
                $set: {
                    disputeOpened: true,
                    disputeOpenedOnTimestamp: timestamp
                }
            })
            await Dispute.create({escrowId: escrowId})
        }
        return res.json({success: true, timestamp: timestamp})
    } else
        return res.json({success: false})
}

export default manageEscrow
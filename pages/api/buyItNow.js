import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import Listing from '../../models/Listing'
import MessageBoard from '../../models/MessageBoard'
import Offer from '../../models/Offer'
import {getEosRate} from '../../server/getEosRate'
import {getTransactionQuantity} from '../../server/getTransactionQuantity'
import {attemptTransaction} from '../../server/attemptTransaction'
import emailValidator from 'email-validator'
import {verifyEosAccountName} from '../../server/verifyEosAccountName'
import {updatePendingTransactions} from '../../server/updatePendingTransactions'
import {prepareTransaction} from '../../server/prepareTransaction'
import {increaseQuantitySold} from '../../server/increaseQuantitySold'
import jwt from 'jsonwebtoken'
import {getIdFromToken} from "../../server/getIdFromToken";
import {sendEmail} from "../../server/sendEmail";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {getDataFromToken} from "../../server/getDataFromToken";
import {validateEosAccountName} from "../../server/validateEosAccountName";
import Escrow from '../../models/Escrow'

const buyItNow = async (req, res) => {
    const eosFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    })
    const usdFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false, reason: 'recaptcha not valid'})
        const eosAccount = data.eosAccount
        let eosAccountName = data.eosAccountName
        let associativePrivateKey = data.associativePrivateKey.trim()
        let memo = data.memo.trim()
        const comments = cleanString(data.comments)
        const emailAddress = data.emailAddress.trim().toLowerCase()
        const offer = data.offer
        const pageTimestamp = data.pageTimestamp
        const code = data.code
        const token = data.token
        let eosAccountToken = null
        if (eosAccount !== 'New') {
            const eosAccountData = getDataFromToken(eosAccount)
            if (!eosAccountData)
                return res.json({success: false, reason: 'eos account data not valid'})
            eosAccountName = eosAccountData.eosAccountName
            associativePrivateKey = eosAccountData.associativePrivateKey
            memo = eosAccountData.memo
        } else {
            const eosAccountPayload = {
                eosAccountName: eosAccountName,
                associativePrivateKey: associativePrivateKey,
                memo: memo
            }
            eosAccountToken = jwt.sign(eosAccountPayload, process.env.JWT_SIGNATURE)
        }
        let listingId = null
        let fixedAmount = null
        let usdAmount = null
        let eosAmount = null
        let buyerEmailAddress = null
        let listing = null
        await connectToDb()
        if (!offer) {
            listing = await Listing.findOne({code: code})
            if (!listing)
                return res.json({success: false, alertMessage: 'Listing not found'})
            if (listing.hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
            listingId = listing._id
            fixedAmount = listing.fixedAmount
            usdAmount = listing.usdAmount
            eosAmount = listing.eosAmount
            buyerEmailAddress = emailAddress
            if (!emailValidator.validate(buyerEmailAddress))
                return res.json({success: false, reason: 'email address not valid'})
        } else {
            const offerId = getIdFromToken(token, 'offerId')
            if (!offerId)
                return res.json({success: false, alertMessage: 'Invalid token'})
            const offer = await Offer.findById(offerId)
            if (!offer)
                return res.json({success: false, alertMessage: 'Offer not found'})
            listingId = offer.listingId
            fixedAmount = offer.fixedAmount
            usdAmount = offer.usdAmount
            eosAmount = offer.eosAmount
            buyerEmailAddress = offer.emailAddress
            listing = await Listing.findOne({_id: listingId})
            if (!listing)
                return res.json({success: false, alertMessage: 'Listing not found'})
            if (listing.hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
        }
        const lastUpdatedOnTimestamp = listing.lastUpdatedOnTimestamp
        if (pageTimestamp <= lastUpdatedOnTimestamp)
            return res.json({success: false, alertMessage: 'Listing out of date'})
        const notes = listing.notes
        const sellerEmailAddress = listing.emailAddress
        const sellerEosAccountName = listing.eosAccountName
        const sellerMemo = listing.memo
        const useEscrow = listing.useEscrow
        const buyerEosAccountName = eosAccountName
        const buyerMemo = memo
        const eosAccountNameValid = validateEosAccountName(buyerEosAccountName)
        if (!eosAccountNameValid)
            return res.json({success: false, reason: 'eos account name not valid', eosAccountName: eosAccountName})
        const eosAccountNameVerified = await verifyEosAccountName(
            buyerEosAccountName
        )
        if (!eosAccountNameVerified) return res.json({success: false, reason: 'eos account name not verified'})
        if (!associativePrivateKey) return res.json({success: false, reason: 'associative private key not valid'})
        const eosRate = await getEosRate()
        // return res.json({success: false, fixedAmount: fixedAmount, usdAmount: usdAmount, eosAmount: eosAmount, eosRate: eosRate})
        const transactionQuantity = getTransactionQuantity(
            fixedAmount,
            usdAmount,
            eosAmount,
            eosRate,
            eosFormatter
        )
        return res.json({success: false, transactionQuantity: transactionQuantity})
        const transactionPrepared = await prepareTransaction(listingId)
        if (!transactionPrepared.success)
            return res.json({success: false, alertMessage: transactionPrepared.alertMessage})
        let sellerEosAccountName2 = ''
        let sellerMemo2 = ''
        if (useEscrow) {
            sellerEosAccountName2 = process.env.ESCROW_EOS_ACCOUNT_NAME
            sellerMemo2 = process.env.ESCROW_MEMO
        } else {
            sellerEosAccountName2 = sellerEosAccountName
            sellerMemo2 = sellerMemo
        }
        let transactionId = ''
        try {
            const result = await attemptTransaction(
                transactionQuantity,
                sellerEosAccountName2,
                buyerEosAccountName,
                associativePrivateKey,
                sellerMemo2,
                useEscrow
            )
            if (result.json && result.json.code) {
                const errorMessage = result.json.error.details[0].message
                return res.json({success: false, alertMessage: errorMessage})
            } else if (!result) {
                return res.json({success: false, reason: 'result not valid'})
            } else transactionId = result.transaction_id
        } catch (error) {
            return res.json({success: false, alertMessage: 'Invalid associative private key'})
        }
        await increaseQuantitySold(listingId)
        await updatePendingTransactions(listingId, false)
        const transactionAmount = parseFloat(
            transactionQuantity.replace(' EOS', '')
        )
        let usdAmountFormatted = ''
        let eosAmountFormatted = eosFormatter
            .format(transactionAmount)
            .replace('$', '')
        if (fixedAmount === 'usd') {
            usdAmountFormatted = usdFormatter.format(usdAmount)
        } else
            usdAmountFormatted = eosFormatter.format(
                transactionAmount * eosRate
            )
        const listingDetails = {
            notes: notes,
            fixedAmount: fixedAmount,
            usdAmount: usdAmountFormatted,
            eosAmount: eosAmountFormatted,
            transactionId: transactionId,
            useEscrow: useEscrow,
            sellerEosAccountName: sellerEosAccountName,
            transactionQuantity: transactionQuantity,
            buyerEosAccountName: buyerEosAccountName,
            buyerMemo: buyerMemo,
            sellerMemo: sellerMemo
        }
        let message =
            'Hello,<br><br>Please reply here with your instructions.<br><br>Thank you,<br><br>Your buyer'
        if (comments) message = comments
        const messages = [
            {
                user: 'buyer',
                message: message,
                timestamp: Date.now()
            }
        ]
        const messageBoard = await MessageBoard.create({
            listingDetails: listingDetails,
            messages: messages,
            sellerEmailAddress: sellerEmailAddress,
            buyerEmailAddress: buyerEmailAddress
        })
        const messageBoardId = messageBoard._id
        if (useEscrow) {
            await Escrow.create({
                messageBoardId: messageBoardId
            })
        }
        const buyerPayload = {user: 'buyer', messageBoardId: messageBoardId}
        const sellerPayload = {user: 'seller', messageBoardId: messageBoardId}
        const JWT_SIGNATURE = process.env.JWT_SIGNATURE
        const buyerToken = jwt.sign(buyerPayload, JWT_SIGNATURE)
        const sellerToken = jwt.sign(sellerPayload, JWT_SIGNATURE)
        let linkBuyer = `https://blockcommerc.com/message-board/${buyerToken}`
        let linkSeller = `https://blockcommerc.com/message-board/${sellerToken}`
        if (!process.env.LIVE) {
            linkBuyer = `http://localhost:3000/message-board/${buyerToken}`
            linkSeller = `http://localhost:3000/message-board/${sellerToken}`
        }
        const subjectSeller = 'You made a sale'
        const subjectBuyer = 'You made a purchase'
        const messageSeller = `Go to your message board for review<br><br><a href=${linkBuyer}>${linkBuyer}</a><br><br>Notes: ${notes}`
        const messageBuyer = `Go to your message board for review<br><br><a href=${linkSeller}>${linkSeller}</a><br><br>Notes: ${notes}`
        await sendEmail(buyerEmailAddress, subjectSeller, messageSeller)
        await sendEmail(sellerEmailAddress, subjectBuyer, messageBuyer)
        return res.json({success: true, eosAccountToken: eosAccountToken, eosAccountName: eosAccountName})
    } else
        return res.json({success: false, reason: 'method not valid'})
}

export default buyItNow
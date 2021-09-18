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
import {getListingPreview} from "../../server/getListingPreview";
import {getLocalhost} from "../../server/getLocalhost";

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

const buyItNow = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
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
                return res.json({success: false, reason: 'eosAccountData not valid'})
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
            listing = await Listing.findById(listingId)
            if (!listing)
                return res.json({success: false, alertMessage: 'Listing not found'})
            if (listing.hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
        }
        const lastUpdatedOnTimestamp = listing.lastUpdatedOnTimestamp
        if (pageTimestamp <= lastUpdatedOnTimestamp)
            return res.json({success: false, alertMessage: 'Listing out of date'})
        const sellerEmailAddress = listing.emailAddress
        const sellerEosAccountName = listing.eosAccountName
        const sellerMemo = listing.memo
        const buyerEosAccountName = eosAccountName
        const buyerMemo = memo
        const eosAccountNameValid = validateEosAccountName(buyerEosAccountName)
        if (!eosAccountNameValid)
            return res.json({success: false, reason: 'eosAccountName not valid'})
        const eosAccountNameVerified = await verifyEosAccountName(buyerEosAccountName)
        if (!eosAccountNameVerified) return res.json({success: false, reason: 'eosAccountName not verified'})
        const eosRate = await getEosRate()
        const transactionQuantity = getTransactionQuantity(fixedAmount, usdAmount, eosAmount, eosRate, eosFormatter)
        const transactionPrepared = await prepareTransaction(listingId)
        if (!transactionPrepared.success) {
            await updatePendingTransactions(listingId, false)
            return res.json({success: false, alertMessage: transactionPrepared.alertMessage})
        }
        let transactionId = ''
        try {
            const result = await attemptTransaction(
                transactionQuantity,
                sellerEosAccountName,
                buyerEosAccountName,
                associativePrivateKey,
                sellerMemo,
                true
            )
            if (result.json && result.json.code) {
                await updatePendingTransactions(listingId, false)
                let errorMessage = result.json.error.details[0].message
                errorMessage = `${errorMessage}\nTrying using the EOS PowerUp!`
                return res.json({success: false, alertMessage: errorMessage})
            } else if (!result) {
                await updatePendingTransactions(listingId, false)
                return res.json({success: false, reason: 'result not valid'})
            } else transactionId = result.transaction_id
        } catch (error) {
            await updatePendingTransactions(listingId, false)
            return res.json({success: false, alertMessage: 'Invalid associative private key'})
        }
        await increaseQuantitySold(listingId)
        await updatePendingTransactions(listingId, false)
        const transactionAmount = parseFloat(transactionQuantity.replace(' EOS', ''))
        let usdAmountFormatted = ''
        let eosAmountFormatted = eosFormatter.format(transactionAmount).replace('$', '')
        if (fixedAmount === 'usd') {
            usdAmountFormatted = usdFormatter.format(usdAmount)
        } else
            usdAmountFormatted = eosFormatter.format(transactionAmount * eosRate)
        const publicListing = listing.publicListing
        const worldwide = listing.worldwide
        const countries = listing.countries
        const title = listing.title
        const description = listing.description
        const keywords = listing.keywords
        const listingDetails = {
            publicListing: publicListing,
            worldwide: worldwide,
            countries: countries,
            title: title,
            description: description,
            keywords: keywords,
            fixedAmount: fixedAmount,
            usdAmount: usdAmountFormatted,
            eosAmount: eosAmountFormatted,
            transactionId: transactionId,
            sellerEosAccountName: sellerEosAccountName,
            transactionQuantity: transactionQuantity,
            buyerEosAccountName: buyerEosAccountName,
            buyerMemo: buyerMemo,
            sellerMemo: sellerMemo
        }
        let message = 'Hello,<br /><br />Please reply here with your instructions, if needed.<br /><br />Thank you,<br /><br />Your buyer'
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
        await Escrow.create({
            messageBoardId: messageBoardId
        })
        const buyerPayload = {user: 'buyer', messageBoardId: messageBoardId}
        const sellerPayload = {user: 'seller', messageBoardId: messageBoardId}
        const JWT_SIGNATURE = process.env.JWT_SIGNATURE
        const buyerToken = jwt.sign(buyerPayload, JWT_SIGNATURE)
        const sellerToken = jwt.sign(sellerPayload, JWT_SIGNATURE)
        let linkBuyer = `https://blockcommerc.com/message-board/${buyerToken}`
        let linkSeller = `https://blockcommerc.com/message-board/${sellerToken}`
        if (getLocalhost(req.socket.remoteAddress)) {
            linkBuyer = `http://localhost:3015/message-board/${buyerToken}`
            linkSeller = `http://localhost:3015/message-board/${sellerToken}`
        }
        const listingPreviewSeller = getListingPreview(title, description, keywords)
        const listingPreviewBuyer = getListingPreview(title, description, [])
        const subjectSeller = `You made a sale! - ${title}`
        const subjectBuyer = `You made a purchase! - ${title}`
        const messageSeller = `Go to your message board for review.<br /><br /><a href=${linkBuyer}>${linkBuyer}</a><br /><br />${listingPreviewBuyer}<br /><br />Transaction ID: ${transactionId}`
        const messageBuyer = `Go to your message board for review.<br /><br /><a href=${linkSeller}>${linkSeller}</a><br /><br />${listingPreviewSeller}<br /><br />Transaction ID: ${transactionId}`
        await sendEmail(buyerEmailAddress, subjectSeller, messageSeller)
        await sendEmail(sellerEmailAddress, subjectBuyer, messageBuyer)
        return res.json({success: true, eosAccountToken: eosAccountToken, eosAccountName: eosAccountName})
    } else
        return res.json({success: false, reason: 'method not valid'})
}

export default buyItNow
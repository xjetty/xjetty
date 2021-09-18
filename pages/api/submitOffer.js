import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import Listing from '../../models/Listing'
import Offer from '../../models/Offer'
import jwt from 'jsonwebtoken'
import {sendEmail} from "../../server/sendEmail";
import {getListingPreview} from "../../server/getListingPreview";
import {getLocalhost} from "../../server/getLocalhost";

const submitOffer = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const code = data.code
        const pageTimestamp = data.pageTimestamp
        const listing = await Listing.findOne({code: code})
        if (!listing) return res.json({success: false, alertMessage: 'Listing not found'})
        const lastUpdatedTimestamp = listing.lastUpdatedTimestamp
        if (pageTimestamp <= lastUpdatedTimestamp)
            return res.json({success: false, alertMessage: 'Listing out of date'})
        if (listing.hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Listing not available'})
        const listingId = listing._id
        const saleMethod = listing.saleMethod
        const fixedAmount = listing.fixedAmount
        const usdAmount = listing.usdAmount
        const eosAmount = listing.eosAmount
        const title = listing.title
        const description = listing.description
        const keywords = listing.keywords
        const listingPreview = getListingPreview(title, description, keywords)
        const sellerEmailAddress = listing.emailAddress
        const maximumPercentLessThan = listing.maximumPercentLessThan
        const offerUsdAmount = parseFloat(data.usdAmount)
        const offerEosAmount = parseFloat(data.eosAmount)
        if (fixedAmount === 'usd') {
            if (offerUsdAmount >= usdAmount && saleMethod !== 'offersOnly')
                return res.json({success: false})
        } else {
            if (offerEosAmount >= eosAmount && saleMethod !== 'offersOnly')
                return res.json({success: false})
        }
        const offerEmailAddress = data.emailAddress
        const payload = {listingId: listingId}
        const JWT_SIGNATURE = process.env.JWT_SIGNATURE
        const token = jwt.sign(payload, JWT_SIGNATURE)
        let link = `https://blockcommerc.com/manager/${token}`
        if (getLocalhost(req.socket.remoteAddress))
            link = `http://localhost:3015/manager/${token}`
        const subject = `You got an offer! - ${title}`
        const message = `You can choose to accept your offer in your manager.<br /><br /><a href=${link}>${link}</a><br /><br />${listingPreview}`
        if (saleMethod === 'askingPriceAndOffers') {
            if (fixedAmount === 'usd') {
                const minimumAmount = usdAmount * (maximumPercentLessThan / 100)
                if (offerUsdAmount >= minimumAmount) {
                    await Offer.create({
                        listingId: listingId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        usdAmount: offerUsdAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            } else {
                const minimumAmount = eosAmount * (maximumPercentLessThan / 100)
                if (offerEosAmount >= minimumAmount) {
                    await Offer.create({
                        listingId: listingId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        eosAmount: offerEosAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            }
        } else if (saleMethod === 'offersOnly') {
            if (fixedAmount === 'usd') {
                if (offerUsdAmount >= usdAmount) {
                    await Offer.create({
                        listingId: listingId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        usdAmount: offerUsdAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            } else {
                if (offerEosAmount >= eosAmount) {
                    await Offer.create({
                        listingId: listingId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        eosAmount: offerEosAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            }
        }
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default submitOffer

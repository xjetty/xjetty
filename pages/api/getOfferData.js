import Listing from '../../models/Listing'
import Offer from '../../models/Offer'
import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import {getIdFromToken} from "../../server/getIdFromToken";
import connectToDb from "../../middleware/connectToDb";

const getOfferData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const token = data.token
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const offerId = getIdFromToken(token, 'offerId')
        if (!offerId)
            return res.json({success: false, alertMessage: 'Invalid token'})
        await connectToDb()
        const offer = await Offer.findById(offerId)
        if (!offer)
            return res.json({success: false, alertMessage: 'Offer not found'})
        if (offer.status !== 'Accepted')
            return res.json({success: false})
        const fixedAmount = offer.fixedAmount
        const usdAmount = offer.usdAmount
        const eosAmount = offer.eosAmount
        const listingId = offer.listingId
        const emailAddress = offer.emailAddress
        const listing = await Listing.findById(listingId)
        if (!listing) return res.json({success: false, alertMessage: 'Listing not found'})
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Listing not available'})
        const hidden = listing.hidden
        if (hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
        const notes = listing.notes
        const useEscrow = listing.useEscrow
        const saleMethod = listing.saleMethod
        if (saleMethod === 'askingPriceOnly')
            return res.json({success: false, alertMessage: 'Offers not accepted'})
        return res.json({
            success: true, listing: {
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                notes: notes,
                useEscrow: useEscrow,
                saleMethod: saleMethod,
                emailAddress: emailAddress
            }
        })
    } else
        return res.json({success: false})
}

export default getOfferData

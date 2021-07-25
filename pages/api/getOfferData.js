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
        if (!recaptchaValid) res.json({success: false})
        const offerId = getIdFromToken(token, 'offerId')
        if (!offerId)
            res.json({success: false, alertMessage: 'Invalid token'})
        await connectToDb()
        const offer = await Offer.findById(offerId)
        if (!offer)
            res.json({success: false, alertMessage: 'Offer not found'})
        if (offer.status !== 'Accepted')
            res.json({success: false})
        const fixedAmount = offer.fixedAmount
        const usdAmount = offer.usdAmount
        const eosAmount = offer.eosAmount
        const listingId = offer.listingId
        const emailAddress = offer.emailAddress
        const listing = await Listing.findById(listingId)
        if (!listing) res.json({success: false, alertMessage: 'Listing not found'})
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            res.json({success: false, alertMessage: 'Listing not available'})
        const hidden = listing.hidden
        if (hidden) res.json({success: false, alertMessage: 'Listing hidden'})
        const notes = listing.notes
        const useEscrow = listing.useEscrow
        const saleMethod = listing.saleMethod
        if (saleMethod === 'askingPriceOnly')
            res.json({success: false, alertMessage: 'Offers not accepted'})
        res.json({
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
        res.json({success: false})
}

export default getOfferData

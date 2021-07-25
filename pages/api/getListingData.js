import Listing from '../../models/Listing'
import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import connectToDb from "../../middleware/connectToDb";
import {insertBreaks} from "../../server/insertBreaks";

const getListingData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const code = data.code.toUpperCase()
        const recaptchaVerified = await verifyRecaptcha(recaptchaResponse)
        if (!recaptchaVerified) res.json({success: false})
        await connectToDb()
        const listing = await Listing.findOne({code: code})
        if (!listing) return res.json({success: false, alertMessage: 'Listing not found'})
        const fixedAmount = listing.fixedAmount
        const usdAmount = listing.usdAmount
        const eosAmount = listing.eosAmount
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            res.json({success: false, alertMessage: 'Listing not available'})
        const hidden = listing.hidden
        if (hidden) res.json({success: false, alertMessage: 'Listing hidden'})
        const notes = insertBreaks(listing.notes)
        const useEscrow = listing.useEscrow
        const saleMethod = listing.saleMethod
        res.json({
            success: true, listing: {
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                notes: notes,
                useEscrow: useEscrow,
                saleMethod: saleMethod
            }
        })
    } else
        res.json({success: false})
}

export default getListingData
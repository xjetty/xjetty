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
        if (!recaptchaVerified) return res.json({success: false})
        await connectToDb()
        const listing = await Listing.findOne({code: code})
        if (!listing) return res.json({success: false, alertMessage: 'Listing not found'})
        const title = listing.title
        const imageLinks = listing.imageLinks
        const publicListing = listing.publicListing
        const worldwide = listing.worldwide
        const countries = listing.countries
        const fixedAmount = listing.fixedAmount
        const usdAmount = listing.usdAmount
        const eosAmount = listing.eosAmount
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Listing not available'})
        const hidden = listing.hidden
        if (hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
        const description = insertBreaks(listing.description)
        const useEscrow = listing.useEscrow
        const saleMethod = listing.saleMethod
        return res.json({
            success: true, listing: {
                title: title,
                imageLinks: imageLinks,
                publicListing: publicListing,
                worldwide: worldwide,
                countries: countries,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                description: description,
                useEscrow: useEscrow,
                saleMethod: saleMethod
            }
        })
    } else
        return res.json({success: false})
}

export default getListingData
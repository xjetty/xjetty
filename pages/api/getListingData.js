import Listing from '../../models/Listing'
import connectToDb from "../../middleware/connectToDb";
import {insertBreaks} from "../../server/insertBreaks";

const getListingData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const code = data.code.toUpperCase()
        await connectToDb()
        const listing = await Listing.findOne({code: code})
        if (!listing) return res.json({success: false, alertMessage: 'Listing not found'})
        const publicListing = listing.publicListing
        const worldwide = listing.worldwide
        const countries = listing.countries
        const title = listing.title
        const imageLinks = listing.imageLinks
        const fixedAmount = listing.fixedAmount
        const useEscrow = listing.useEscrow
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
        const saleMethod = listing.saleMethod
        const createdOnTimestamp = listing.createdOnTimestamp
        const lastUpdatedOnTimestamp = listing.lastUpdatedOnTimestamp
        return res.json({
            success: true, listing: {
                publicListing: publicListing,
                worldwide: worldwide,
                countries: countries,
                title: title,
                imageLinks: imageLinks,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                description: description,
                saleMethod: saleMethod,
                useEscrow: useEscrow,
                createdOnTimestamp: createdOnTimestamp,
                lastUpdatedOnTimestamp: lastUpdatedOnTimestamp
            }
        })
    } else
        return res.json({success: false})
}

export default getListingData
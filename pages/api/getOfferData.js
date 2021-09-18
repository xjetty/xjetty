import Listing from '../../models/Listing'
import Offer from '../../models/Offer'
import {getIdFromToken} from "../../server/getIdFromToken";
import connectToDb from "../../middleware/connectToDb";
import {insertBreaks} from "../../server/insertBreaks";
import {getLocalhost} from "../../server/getLocalhost";

const getOfferData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
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
        const publicListing = listing.publicListing
        const worldwide = listing.worldwide
        const countries = listing.countries
        const title = listing.title
        const imageLinks = listing.imageLinks
        const code = listing.code
        let link = `https://blockcommerc.com/listing/${code}`
        if (getLocalhost(req.socket.remoteAddress))
            link = `http://localhost:3015/listing/${code}`
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Listing not available'})
        const hidden = listing.hidden
        if (hidden) return res.json({success: false, alertMessage: 'Listing hidden'})
        const description = insertBreaks(listing.description)
        const saleMethod = listing.saleMethod
        if (saleMethod === 'askingPriceOnly')
            return res.json({success: false, alertMessage: 'Offers not accepted'})
        return res.json({
            success: true, listing: {
                publicListing: publicListing,
                worldwide: worldwide,
                countries: countries,
                title: title,
                link: link,
                imageLinks: imageLinks,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                description: description,
                saleMethod: saleMethod,
                emailAddress: emailAddress
            }
        })
    } else
        return res.json({success: false})
}

export default getOfferData

import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from '../../models/Listing'
import Offer from '../../models/Offer'
import jwt from "jsonwebtoken";
import connectToDb from "../../middleware/connectToDb";
import {getLocalhost} from "../../server/getLocalhost";

const getManagerData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            return res.json({success: false, alertMessage: 'Invalid token'})
        await connectToDb()
        const listing = await Listing.findById(listingId)
        if (!listing)
            return res.json({success: false, alertMessage: 'Listing not found'})
        const publicListing = listing.publicListing
        const worldwide = listing.worldwide
        const countries = listing.countries
        const title = listing.title
        const imageLinks = listing.imageLinks
        const description = listing.description
        const keywords = listing.keywords
        const fixedAmount = listing.fixedAmount
        const usdAmount = listing.usdAmount
        const eosAmount = listing.eosAmount
        const useEscrow = listing.useEscrow
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const minimumQuantity = (quantity - (quantity - quantitySold)) + 1
        const hidden = listing.hidden
        const saleMethod = listing.saleMethod
        const eosAccountName = listing.eosAccountName
        const maximumPercentLessThan = listing.maximumPercentLessThan
        const code = listing.code
        const link = `https://blockcommerc.com/listing/${code}`
        const listingData = {
            publicListing: publicListing,
            worldwide: worldwide,
            countries: countries,
            title: title,
            imageLinks: imageLinks,
            description: description,
            keywords: keywords,
            fixedAmount: fixedAmount,
            usdAmount: usdAmount,
            eosAmount: eosAmount,
            quantity: quantity,
            quantitySold: quantitySold,
            minimumQuantity: minimumQuantity,
            hidden: hidden,
            saleMethod: saleMethod,
            useEscrow: useEscrow,
            code: code,
            link: link,
            eosAccountName: eosAccountName,
            maximumPercentLessThan: maximumPercentLessThan
        }
        const offers = await Offer.find({listingId: listingId})
        const offerData = []
        offers.forEach((offer) => {
            offerData.push({
                offerToken: jwt.sign({offerId: offer._id}, process.env.JWT_SIGNATURE),
                status: offer.status,
                fixedAmount: offer.fixedAmount,
                usdAmount: offer.usdAmount,
                eosAmount: offer.eosAmount,
                statusUpdatedOnTimestamp: offer.statusUpdatedOnTimestamp,
                createdOnTimestamp: offer.createdOnTimestamp
            })
        })
        return res.json({success: true, listing: listingData, offers: offerData})
    } else
        return res.json({success: false})
}

export default getManagerData
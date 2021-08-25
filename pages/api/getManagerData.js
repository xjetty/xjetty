import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from '../../models/Listing'
import Offer from '../../models/Offer'
import {updateCode} from "../../server/updateCode";
import jwt from "jsonwebtoken";
import connectToDb from "../../middleware/connectToDb";

const getManagerData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            return res.json({success: false, alertMessage: 'Invalid token'})
        await connectToDb()
        const listing = await Listing.findById(listingId)
        if (!listing)
            return res.json({success: false, alertMessage: 'Listing not found'})
        let code = listing.code
        if (!code)
            code = await updateCode(listingId)
        const title = listing.title
        const imageLinks = listing.imageLinks
        const description = listing.description
        const publicListing = listing.publicListing
        const keywords = listing.keywords
        const worldwide = listing.worldwide
        const countries = listing.countries
        const fixedAmount = listing.fixedAmount
        const usdAmount = listing.usdAmount
        const eosAmount = listing.eosAmount
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const minimumQuantity = (quantity - (quantity - quantitySold)) + 1
        const hidden = listing.hidden
        const useEscrow = listing.useEscrow
        const saleMethod = listing.saleMethod
        const eosAccountName = listing.eosAccountName
        const maximumPercentLessThan = listing.maximumPercentLessThan
        let link = `https://blockcommerc.com/listing/${code}`
        if (!process.env.LIVE)
            link = `http://localhost:3000/listing/${code}`
        const listingData = {
            title: title,
            imageLinks: imageLinks,
            description: description,
            publicListing: publicListing,
            keywords: keywords,
            worldwide: worldwide,
            countries: countries,
            fixedAmount: fixedAmount,
            usdAmount: usdAmount,
            eosAmount: eosAmount,
            quantity: quantity,
            quantitySold: quantitySold,
            minimumQuantity: minimumQuantity,
            hidden: hidden,
            useEscrow: useEscrow,
            saleMethod: saleMethod,
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
import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from '../../models/Listing'
import Offer from '../../models/Offer'
import {updateCode} from "../../server/updateCode";
import jwt from "jsonwebtoken";
import connectToDb from "../../middleware/connectToDb";
import {insertBreaks} from "../../server/insertBreaks";

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
        const fixedAmount = listing.fixedAmount
        const usdAmount = listing.usdAmount
        const eosAmount = listing.eosAmount
        const quantity = listing.quantity
        const quantitySold = listing.quantitySold
        const minimumQuantity = (quantity - (quantity - quantitySold)) + 1
        const hidden = listing.hidden
        const notes = listing.notes
        const useEscrow = listing.useEscrow
        const saleMethod = listing.saleMethod
        const eosAccountName = listing.eosAccountName
        const maximumPercentLessThan = listing.maximumPercentLessThan
        let link = `https://blockcommerc.com/listing/${code}`
        if (!process.env.LIVE)
            link = `http://localhost:3000/listing/${code}`
        const listingData = {
            fixedAmount: fixedAmount,
            usdAmount: usdAmount,
            eosAmount: eosAmount,
            quantity: quantity,
            quantitySold: quantitySold,
            minimumQuantity: minimumQuantity,
            hidden: hidden,
            notes: notes,
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
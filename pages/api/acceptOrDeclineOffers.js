import jwt from "jsonwebtoken";
import {getIdsFromTokens} from "../../server/getIdsFromTokens";
import Offer from '../../models/Offer'
import Listing from '../../models/Listing'
import {sendEmail} from "../../server/sendEmail";
import connectToDb from "../../middleware/connectToDb";
import {getIdFromToken} from "../../server/getIdFromToken";
import {getListingPreview} from "../../server/getListingPreview";
import {getLocalhost} from "../../server/getLocalhost";

const acceptOrDeclineOffers = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            return res.json({success: false})
        const listing = await Listing.findById(listingId)
        const title = listing.title
        const description = listing.description
        const listingPreview = getListingPreview(title, description, [])
        const subject = `Your offer was accepted! - ${title}`
        const offerTokens = data.offerTokens
        const decision = data.decision
        const decisions = ['accept', 'decline']
        if (!decisions.includes(decision))
            return res.json({success: false})
        let status = ''
        if (decision === 'accept') {
            status = 'Accepted'
        } else
            status = 'Declined'
        const offerIds = getIdsFromTokens(offerTokens, 'offerId')
        await connectToDb()
        const offers = await Offer.find({listingId: listingId})
        if (!offers)
            return res.json({success: false})
        const timestamp = Date.now()
        for (const offer of offers) {
            if (offerIds.includes(offer._id.toString()) && offer.status === 'Pending decision') {
                await Offer.updateOne({_id: offer._id}, {$set: {status: status, statusUpdatedOnTimestamp: timestamp}})
                if (status === 'Accepted') {
                    const emailAddress = offer.emailAddress
                    const token = jwt.sign({offerId: offer._id}, process.env.JWT_SIGNATURE)
                    let link = `https://blockcommerc.com/offer/${token}`
                    if (getLocalhost(req.socket.remoteAddress))
                        link = `http://localhost:3015/offer/${token}`
                    const message = `Confirm and pay for your offer.<br /><br /><a href=${link}>${link}</a><br /><br />${listingPreview}`
                    await sendEmail(emailAddress, subject, message)
                }
            }
        }
        return res.json({success: true, timestamp: timestamp})
    } else
        return res.json({success: false})
}

export default acceptOrDeclineOffers
import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from "../../models/Listing";
import connectToDb from "../../middleware/connectToDb";

const updateListing = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const recaptchaResponse = data.recaptchaResponse
        delete data.recaptchaResponse
        delete data.token
        data.lastUpdatedTimestamp = Date.now()
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) res.json({success: false})
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            res.json({success: false})
        await connectToDb()
        await Listing.updateOne({_id: listingId}, {$set: data})
        res.json({success: true})
    } else
        res.json({success: false})
}

export default updateListing
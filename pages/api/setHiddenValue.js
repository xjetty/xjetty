import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from "../../models/Listing";
import connectToDb from "../../middleware/connectToDb";

const setHiddenValue = async (req, res) => {

    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) res.json({success: false})
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            res.json({success: false})
        await connectToDb()
        const listing = await Listing.findById(listingId)
        const hidden = listing.hidden
        await Listing.updateOne({_id: listingId}, {$set: {hidden: !hidden, lastUpdatedTimestamp: Date.now()}})
        res.json({success: true})
    } else
        res.json({success: false})

}

export default setHiddenValue
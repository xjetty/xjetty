import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from "../../models/Listing";
import connectToDb from "../../middleware/connectToDb";

const changeHidden = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            return res.json({success: false})
        await connectToDb()
        const listing = await Listing.findById(listingId)
        const hidden = listing.hidden
        await Listing.updateOne({_id: listingId}, {$set: {hidden: !hidden, lastUpdatedTimestamp: Date.now()}})
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default changeHidden
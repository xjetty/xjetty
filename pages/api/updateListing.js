import {getIdFromToken} from "../../server/getIdFromToken";
import Listing from "../../models/Listing";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";

const updateListing = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        delete data.token
        data.description = cleanString(data.description)
        data.keywords = data.keywords.map(function (keyword) {
            return keyword.toLowerCase()
        })
        data.keywordsString = data.keywords.join(' ')
        data.lastUpdatedOnTimestamp = Date.now()
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            return res.json({success: false})
        await connectToDb()
        await Listing.updateOne({_id: listingId}, {$set: data})
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default updateListing
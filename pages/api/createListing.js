import Listing from '../../models/Listing'
import jwt from 'jsonwebtoken'
import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import {sendEmail} from '../../server/sendEmail'
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {getListingPreview} from "../../server/getListingPreview";
import {getLocalhost} from "../../server/getLocalhost";
import {generateCode} from "../../server/generateCode";

const createListing = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = await verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        delete data.recaptchaResponse
        data.description = cleanString(data.description)
        data.keywords = data.keywords.map(function (keyword) {
            return keyword.toLowerCase()
        })
        await connectToDb()
        try {
            data.code = await generateCode()
            const listing = await Listing.create(data)
            const listingId = listing._id
            const title = listing.title
            const description = listing.description
            const keywords = listing.keywords
            const emailAddress = listing.emailAddress
            const listingPreview = getListingPreview(title, description, keywords)
            const payload = {listingId: listingId}
            const token = jwt.sign(payload, process.env.JWT_SIGNATURE)
            const link = `https://blockcommerc.com/manager/${token}`
            const subject = `You created a listing! - ${title}`
            const message = `You can review your listing by visiting your manager.<br /><br /><a href=${link}>${link}</a><br /><br />${listingPreview}`
            await sendEmail(emailAddress, subject, message)
            return res.json({success: true})
        } catch (e) {
            return res.json({success: false})
        }
    } else
        return res.json({success: false})
}

export default createListing
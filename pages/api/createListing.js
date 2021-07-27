import Listing from '../../models/Listing'
import jwt from 'jsonwebtoken'
import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import {sendEmail} from '../../server/sendEmail'
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {insertBreaks} from "../../server/insertBreaks";

const createListing = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = await verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        delete data.recaptchaResponse
        data.notes = cleanString(data.notes)
        await connectToDb()
        try {
            const listing = await Listing.create(data)
            const listingId = listing._id
            const emailAddress = listing.emailAddress
            const notes = listing.notes
            const payload = {listingId: listingId}
            const token = jwt.sign(payload, process.env.JWT_SIGNATURE)
            let link = `https://blockcommerc.com/manager/${token}`
            if (!process.env.LIVE)
                link = `http://localhost:3000/manager/${token}`
            const subject = 'You created a listing'
            const message = `Share the code in your manager<br><br><a href=${link}>${link}</a><br><br>Notes: ${insertBreaks(notes)}`
            await sendEmail(emailAddress, subject, message)
            return res.json({success: true})
        } catch (e) {
            return res.json({success: false})
        }
    } else
        return res.json({success: false})
}

export default createListing
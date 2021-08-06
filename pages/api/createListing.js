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
        if (!recaptchaValid) return res.json({success: false, recaptcha: 'true'})
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
            const subject = 'You created a listing!'
            const message = `Share the link or code in your manager<br><br><a href=${link}>${link}</a><br><br>Notes: ${insertBreaks(notes)}`
            const emailSent = await sendEmail(emailAddress, subject, message)
            return res.json({aosidjfoisda: 'asdfsd', asdoifhasoidjhf: emailSent})
            if (emailSent) {
                return res.json({success: true})
            } else
                return res.json({success: false, emailError: emailSent})
        } catch (e) {
            return res.json({success: false, here: 'here'})
        }
    } else
        return res.json({success: false, bye: 'bye'})
}

export default createListing
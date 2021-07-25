import {verifyRecaptcha} from "../../server/verifyRecaptcha";
import {updateCode} from "../../server/updateCode";
import {getIdFromToken} from "../../server/getIdFromToken";
import connectToDb from "../../middleware/connectToDb";

const generateNewCode = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const listingId = getIdFromToken(token, 'listingId')
        if (!listingId)
            return res.json({success: false})
        await connectToDb()
        const code = await updateCode(listingId)
        let link = `https://blockcommerc.com/listing/${code}`
        if (!process.env.LIVE)
            link = `http://localhost:3000/listing/${code}`
        return res.json({success: true, link: link, code: code})
    } else
        return res.json({success: false})
}

export default generateNewCode
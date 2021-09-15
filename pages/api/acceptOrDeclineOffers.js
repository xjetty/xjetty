import jwt from "jsonwebtoken";
import {getIdsFromTokens} from "../../server/getIdsFromTokens";
import Offer from '../../models/Offer'
import Post from '../../models/Post'
import {sendEmail} from "../../server/sendEmail";
import connectToDb from "../../middleware/connectToDb";
import {getIdFromToken} from "../../server/getIdFromToken";
import {getPostPreview} from "../../server/getPostPreview";
import {getLocalhost} from "../../server/getLocalhost";

const acceptOrDeclineOffers = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const postId = getIdFromToken(token, 'postId')
        if (!postId)
            return res.json({success: false})
        const post = await Post.findById(postId)
        const mode = post.mode
        const platforms = post.platforms
        const category = post.category
        const subcategory = post.subcategory
        const title = post.title
        const description = post.description
        const postPreview = getPostPreview(mode, platforms, category, subcategory, title, description, [])
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
        const offers = await Offer.find({postId: postId})
        if (!offers)
            return res.json({success: false})
        const timestamp = Date.now()
        for (const offer of offers) {
            if (offerIds.includes(offer._id.toString()) && offer.status === 'Choose to accept or decline this offer') {
                await Offer.updateOne({_id: offer._id}, {$set: {status: status, statusUpdatedOnTimestamp: timestamp}})
                if (status === 'Accepted') {
                    const emailAddress = offer.emailAddress
                    const token = jwt.sign({offerId: offer._id}, process.env.JWT_SIGNATURE)
                    let link = `https://d2rcrypto.com/offer/${token}`
                    if (getLocalhost())
                        link = `http://localhost:3010/offer/${token}`
                    const message = `Confirm and pay for your offer.<br /><br /><a href=${link}>${link}</a><br /><br />${postPreview}`
                    await sendEmail(emailAddress, subject, message)
                }
            }
        }
        return res.json({success: true, timestamp: timestamp})
    } else
        return res.json({success: false})
}

export default acceptOrDeclineOffers
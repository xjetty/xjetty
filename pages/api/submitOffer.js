import {verifyRecaptcha} from '../../server/verifyRecaptcha'
import Post from '../../models/Listing'
import Offer from '../../models/Offer'
import jwt from 'jsonwebtoken'
import {sendEmail} from "../../server/sendEmail";
import {getListingPreview} from "../../server/getListingPreview";
import {getLocalhost} from "../../server/getLocalhost";

const submitOffer = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const recaptchaResponse = data.recaptchaResponse
        const recaptchaValid = verifyRecaptcha(recaptchaResponse)
        if (!recaptchaValid) return res.json({success: false})
        const code = data.code
        const pageTimestamp = data.pageTimestamp
        const post = await Post.findOne({code: code})
        if (!post) return res.json({success: false, alertMessage: 'Post not found'})
        const lastUpdatedTimestamp = post.lastUpdatedTimestamp
        if (pageTimestamp <= lastUpdatedTimestamp)
            return res.json({success: false, alertMessage: 'Post out of date'})
        if (post.hidden) return res.json({success: false, alertMessage: 'Post hidden'})
        const quantity = post.quantity
        const quantitySold = post.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Post not available'})
        const postId = post._id
        const saleMethod = post.saleMethod
        const fixedAmount = post.fixedAmount
        const usdAmount = post.usdAmount
        const eosAmount = post.eosAmount
        const mode = post.mode
        const platforms = post.platforms
        const category = post.category
        const subcategory = post.subcategory
        const title = post.title
        const description = post.description
        const keywords = post.keywords
        const postPreview = getListingPreview(mode, platforms, category, subcategory, title, description, keywords)
        const sellerEmailAddress = post.emailAddress
        const maximumPercentLessThan = post.maximumPercentLessThan
        const offerUsdAmount = parseFloat(data.usdAmount)
        const offerEosAmount = parseFloat(data.eosAmount)
        if (fixedAmount === 'usd') {
            if (offerUsdAmount >= usdAmount && saleMethod !== 'offersOnly')
                return res.json({success: false})
        } else {
            if (offerEosAmount >= eosAmount && saleMethod !== 'offersOnly')
                return res.json({success: false})
        }
        const offerEmailAddress = data.emailAddress
        const payload = {postId: postId}
        const JWT_SIGNATURE = process.env.JWT_SIGNATURE
        const token = jwt.sign(payload, JWT_SIGNATURE)
        let link = `https://blockcommerc.com/manager/${token}`
        if (getLocalhost())
            link = `http://localhost:3015/manager/${token}`
        const subject = `You got an offer! - ${title}`
        const message = `You can choose to accept your offer in your manager.<br /><br /><a href=${link}>${link}</a><br /><br />${postPreview}`
        if (saleMethod === 'askingPriceAndOffers') {
            if (fixedAmount === 'usd') {
                const minimumAmount = usdAmount * (maximumPercentLessThan / 100)
                if (offerUsdAmount >= minimumAmount) {
                    await Offer.create({
                        postId: postId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        usdAmount: offerUsdAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            } else {
                const minimumAmount = eosAmount * (maximumPercentLessThan / 100)
                if (offerEosAmount >= minimumAmount) {
                    await Offer.create({
                        postId: postId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        eosAmount: offerEosAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            }
        } else if (saleMethod === 'offersOnly') {
            if (fixedAmount === 'usd') {
                if (offerUsdAmount >= usdAmount) {
                    await Offer.create({
                        postId: postId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        usdAmount: offerUsdAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            } else {
                if (offerEosAmount >= eosAmount) {
                    await Offer.create({
                        postId: postId,
                        emailAddress: offerEmailAddress,
                        fixedAmount: fixedAmount,
                        eosAmount: offerEosAmount
                    })
                    await sendEmail(sellerEmailAddress, subject, message)
                }
            }
        }
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default submitOffer

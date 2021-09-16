import Post from '../../models/Listing'
import Offer from '../../models/Offer'
import {getIdFromToken} from "../../server/getIdFromToken";
import connectToDb from "../../middleware/connectToDb";
import {insertBreaks} from "../../server/insertBreaks";
import {getLocalhost} from "../../server/getLocalhost";

const getOfferData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const offerId = getIdFromToken(token, 'offerId')
        if (!offerId)
            return res.json({success: false, alertMessage: 'Invalid token'})
        await connectToDb()
        const offer = await Offer.findById(offerId)
        if (!offer)
            return res.json({success: false, alertMessage: 'Offer not found'})
        if (offer.status !== 'Accepted')
            return res.json({success: false})
        const fixedAmount = offer.fixedAmount
        const usdAmount = offer.usdAmount
        const eosAmount = offer.eosAmount
        const postId = offer.postId
        const emailAddress = offer.emailAddress
        const post = await Post.findById(postId)
        if (!post) return res.json({success: false, alertMessage: 'Post not found'})
        const mode = post.mode
        const platforms = post.platforms
        const category = post.category
        const subcategory = post.subcategory
        const title = post.title
        const code = post.code
        let link = `https://blockcommerc.com/post/${code}`
        if (getLocalhost())
            link = `https://localhost:3015/post/${code}`
        const imageLink = post.imageLink
        const quantity = post.quantity
        const quantitySold = post.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Post not available'})
        const hidden = post.hidden
        if (hidden) return res.json({success: false, alertMessage: 'Post hidden'})
        const description = insertBreaks(post.description)
        const saleMethod = post.saleMethod
        if (saleMethod === 'askingPriceOnly')
            return res.json({success: false, alertMessage: 'Offers not accepted'})
        return res.json({
            success: true, post: {
                mode: mode,
                platforms: platforms,
                category: category,
                subcategory: subcategory,
                title: title,
                link: link,
                imageLink: imageLink,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                description: description,
                saleMethod: saleMethod,
                emailAddress: emailAddress
            }
        })
    } else
        return res.json({success: false})
}

export default getOfferData

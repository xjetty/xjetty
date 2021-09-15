import {getIdFromToken} from "../../server/getIdFromToken";
import Post from '../../models/Post'
import Offer from '../../models/Offer'
import jwt from "jsonwebtoken";
import connectToDb from "../../middleware/connectToDb";
import {getLocalhost} from "../../server/getLocalhost";

const getManagerData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const postId = getIdFromToken(token, 'postId')
        if (!postId)
            return res.json({success: false, alertMessage: 'Invalid token'})
        await connectToDb()
        const post = await Post.findById(postId)
        if (!post)
            return res.json({success: false, alertMessage: 'Post not found'})
        const mode = post.mode
        const platforms = post.platforms
        const category = post.category
        const subcategory = post.subcategory
        const title = post.title
        const imageLink = post.imageLink
        const description = post.description
        const keywords = post.keywords
        const fixedAmount = post.fixedAmount
        const usdAmount = post.usdAmount
        const eosAmount = post.eosAmount
        const quantity = post.quantity
        const quantitySold = post.quantitySold
        const minimumQuantity = (quantity - (quantity - quantitySold)) + 1
        const hidden = post.hidden
        const saleMethod = post.saleMethod
        const eosAccountName = post.eosAccountName
        const maximumPercentLessThan = post.maximumPercentLessThan
        const code = post.code
        let link = `https://d2rcrypto.com/post/${code}`
        if (getLocalhost())
            link = `http://localhost:3010/post/${code}`
        const postData = {
            mode: mode,
            platforms: platforms,
            category: category,
            subcategory: subcategory,
            title: title,
            imageLink: imageLink,
            description: description,
            keywords: keywords,
            fixedAmount: fixedAmount,
            usdAmount: usdAmount,
            eosAmount: eosAmount,
            quantity: quantity,
            quantitySold: quantitySold,
            minimumQuantity: minimumQuantity,
            hidden: hidden,
            saleMethod: saleMethod,
            code: code,
            link: link,
            eosAccountName: eosAccountName,
            maximumPercentLessThan: maximumPercentLessThan
        }
        const offers = await Offer.find({postId: postId})
        const offerData = []
        offers.forEach((offer) => {
            offerData.push({
                offerToken: jwt.sign({offerId: offer._id}, process.env.JWT_SIGNATURE),
                status: offer.status,
                fixedAmount: offer.fixedAmount,
                usdAmount: offer.usdAmount,
                eosAmount: offer.eosAmount,
                statusUpdatedOnTimestamp: offer.statusUpdatedOnTimestamp,
                createdOnTimestamp: offer.createdOnTimestamp
            })
        })
        return res.json({success: true, post: postData, offers: offerData})
    } else
        return res.json({success: false})
}

export default getManagerData
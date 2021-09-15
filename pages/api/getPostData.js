import Post from '../../models/Post'
import connectToDb from "../../middleware/connectToDb";
import {insertBreaks} from "../../server/insertBreaks";

const getPostData = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const code = data.code.toUpperCase()
        await connectToDb()
        const post = await Post.findOne({code: code})
        if (!post) return res.json({success: false, alertMessage: 'Post not found'})
        const mode = post.mode
        const platforms = post.platforms
        const category = post.category
        const subcategory = post.subcategory
        const title = post.title
        const imageLink = post.imageLink
        const fixedAmount = post.fixedAmount
        const usdAmount = post.usdAmount
        const eosAmount = post.eosAmount
        const quantity = post.quantity
        const quantitySold = post.quantitySold
        const quantityAvailable = quantity - quantitySold
        if (!quantityAvailable)
            return res.json({success: false, alertMessage: 'Post not available'})
        const hidden = post.hidden
        if (hidden) return res.json({success: false, alertMessage: 'Post hidden'})
        const description = insertBreaks(post.description)
        const saleMethod = post.saleMethod
        const createdOnTimestamp = post.createdOnTimestamp
        const lastUpdatedOnTimestamp = post.lastUpdatedOnTimestamp
        return res.json({
            success: true, post: {
                mode: mode,
                platforms: platforms,
                category: category,
                subcategory: subcategory,
                title: title,
                imageLink: imageLink,
                fixedAmount: fixedAmount,
                usdAmount: usdAmount,
                eosAmount: eosAmount,
                description: description,
                saleMethod: saleMethod,
                createdOnTimestamp: createdOnTimestamp,
                lastUpdatedOnTimestamp: lastUpdatedOnTimestamp
            }
        })
    } else
        return res.json({success: false})
}

export default getPostData
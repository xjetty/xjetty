import {getIdFromToken} from "../../server/getIdFromToken";
import Post from "../../models/Post";
import connectToDb from "../../middleware/connectToDb";
import {cleanString} from "../../server/cleanString";
import {categoryAndSubcategoryOptions} from '../../categoryAndSubcategoryOptions'

const updatePost = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        delete data.token
        data.description = cleanString(data.description)
        data.keywords = data.keywords.map(function (keyword) {
            return keyword.toLowerCase()
        })
        data.lastUpdatedTimestamp = Date.now()
        const postId = getIdFromToken(token, 'postId')
        if (!postId)
            return res.json({success: false})
        if (!data.category)
            return res.json({success: false})
        const subcategories = categoryAndSubcategoryOptions.find(x => x.category === data.category).subcategories
        if (subcategories.length > 0) {
            if (!subcategories.includes(data.subcategory))
                return res.json({success: false})
        }
        await connectToDb()
        await Post.updateOne({_id: postId}, {$set: data})
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default updatePost
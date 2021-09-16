import {getIdFromToken} from "../../server/getIdFromToken";
import Post from "../../models/Listing";
import connectToDb from "../../middleware/connectToDb";

const changeHidden = async (req, res) => {
    const method = req.method
    if (method === 'POST') {
        const data = req.body
        const token = data.token
        const postId = getIdFromToken(token, 'postId')
        if (!postId)
            return res.json({success: false})
        await connectToDb()
        const post = await Post.findById(postId)
        const hidden = post.hidden
        await Post.updateOne({_id: postId}, {$set: {hidden: !hidden, lastUpdatedTimestamp: Date.now()}})
        return res.json({success: true})
    } else
        return res.json({success: false})
}

export default changeHidden
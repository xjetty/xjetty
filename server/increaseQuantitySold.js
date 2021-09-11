import Post from '../models/Post'

export async function increaseQuantitySold(postId) {
    const post = await Post.findOne({_id: postId}, {quantitySold: 1})
    const quantitySold = post.quantitySold
    await Post.updateOne(
        {_id: postId},
        {$set: {quantitySold: quantitySold + 1}}
    )
}

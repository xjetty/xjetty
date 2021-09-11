import Post from '../models/Post'

export async function updatePendingTransactions(postId, add = true) {
    const post = await Post.findOne({_id: postId}, {pendingTransactions: 1})
    const pendingTransactions = post.pendingTransactions
    if (add) {
        await Post.updateOne({_id: postId}, {$set: {pendingTransactions: pendingTransactions + 1}})
    } else await Post.updateOne({_id: postId}, {$set: {pendingTransactions: pendingTransactions - 1}})
}

import Post from '../models/Listing'
import {updatePendingTransactions} from './updatePendingTransactions'

export async function prepareTransaction(postId) {
    const post = await Post.findOne(
        {_id: postId},
        {quantity: 1, quantitySold: 1, pendingTransactions: 1}
    )
    const quantity = post.quantity
    const quantitySold = post.quantitySold
    const pendingTransactions = post.pendingTransactions
    const quantityAvailable = quantity - quantitySold
    if (quantityAvailable === 0)
        return {success: false, alertMessage: 'Quantity not available'}
    if (pendingTransactions === quantityAvailable)
        return {success: false, alertMessage: 'Pending transaction'}
    await updatePendingTransactions(postId)
    return {success: true}
}

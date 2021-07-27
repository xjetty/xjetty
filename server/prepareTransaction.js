import Listing from '../models/Listing'
import {updatePendingTransactions} from './updatePendingTransactions'

export async function prepareTransaction(listingId) {
    const listing = await Listing.findOne(
        {_id: listingId},
        {quantity: 1, quantitySold: 1, pendingTransactions: 1}
    )
    const quantity = listing.quantity
    const quantitySold = listing.quantitySold
    const pendingTransactions = listing.pendingTransactions
    const quantityAvailable = quantity - quantitySold
    if (quantityAvailable === 0)
        return {success: false, alertMessage: 'Quantity not available'}
    if (pendingTransactions === quantityAvailable)
        return {success: false, alertMessage: 'Pending transaction'}
    await updatePendingTransactions(listingId)
    return {success: true}
}

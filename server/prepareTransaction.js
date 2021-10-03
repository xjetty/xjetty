import Listing from '../models/Listing'
import {updatePendingTransactions} from './updatePendingTransactions'

export async function prepareTransaction(listingId, quantityRequested) {
    const listing = await Listing.findOne(
        {_id: listingId},
        {quantity: 1, quantitySold: 1, pendingTransactions: 1}
    )
    const quantity = listing.quantity
    const quantitySold = listing.quantitySold
    const pendingTransactions = listing.pendingTransactions
    const quantityAvailable = quantity - quantitySold
    const quantityRemaining = quantityAvailable - pendingTransactions
    if (quantityRequested > quantityRemaining)
        return {success: false, alertMessage: 'Quantity not available'}
    await updatePendingTransactions(listingId, quantityRequested)
    return {success: true}
}

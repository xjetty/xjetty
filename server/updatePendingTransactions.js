import Listing from '../models/Listing'

export async function updatePendingTransactions(listingId, quantityRequested, add = true) {
    const listing = await Listing.findOne({_id: listingId}, {pendingTransactions: 1})
    const pendingTransactions = listing.pendingTransactions
    if (add) {
        await Listing.updateOne({_id: listingId}, {$set: {pendingTransactions: pendingTransactions + quantityRequested}})
    } else await Listing.updateOne({_id: listingId}, {$set: {pendingTransactions: pendingTransactions - quantityRequested}})
}
